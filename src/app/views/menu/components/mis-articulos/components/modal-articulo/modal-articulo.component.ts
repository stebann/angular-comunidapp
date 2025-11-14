import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { FilterOption } from '../../../../../../shared/models/filter-models';
import { FiltersService } from '../../../../../../shared/services/filters.service';
import { ImageHandlerService } from '../../../../../../shared/services/image-handler.service';
import { MisArticulosService } from '../../services/mis-articulos.service';

@Component({
  selector: 'app-modal-articulo',
  templateUrl: './modal-articulo.component.html',
  styleUrls: ['./modal-articulo.component.scss'],
})
export class ModalArticuloComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  categorias: FilterOption[] = [];
  estados: FilterOption[] = [];
  tiposTransaccion: FilterOption[] = [];
  ventaId: any = null;

  isDragOver = false;
  previewImages: string[] = [];
  currentImageIndex = 0;

  private readonly IMAGE_BASE_URL = 'http://localhost:8080/api/articulo/imagen';
  private readonly MAX_IMAGES = 5;

  constructor(
    public ref: DynamicDialogRef,
    private filtersService: FiltersService,
    private articulosService: MisArticulosService,
    private authService: AuthService,
    private imageHandler: ImageHandlerService
  ) {}

  ngOnInit(): void {
    this.loadFilters();
    this.setupPrecioValidation();
    this.loadExistingImages();
  }

  private loadFilters(): void {
    this.filtersService
      .getCategorias()
      .subscribe((categorias) => (this.categorias = categorias));

    this.filtersService
      .getEstados()
      .subscribe((estados) => (this.estados = estados));

    this.filtersService.getTiposTransaccion().subscribe((tipos) => {
      this.tiposTransaccion = tipos;
      const ventaTipo = tipos.find((t) => t.label.toLowerCase() === 'venta');
      if (ventaTipo) {
        this.ventaId = ventaTipo.value;
        this.updatePrecioValidation();
      }
    });
  }

  private setupPrecioValidation(): void {
    this.form.get('tipoTransaccionId')?.valueChanges.subscribe(() => {
      this.updatePrecioValidation();
    });
  }

  private updatePrecioValidation(): void {
    const tipoTransaccionId = this.form.get('tipoTransaccionId')?.value;
    const precioControl = this.form.get('precio');

    if (tipoTransaccionId == this.ventaId) {
      precioControl?.setValidators([Validators.required, Validators.min(0)]);
    } else {
      precioControl?.clearValidators();
      precioControl?.setValue(null);
    }
    precioControl?.updateValueAndValidity();
  }

  private loadExistingImages(): void {
    const formEdit = this.articulosService.formEdit;
    if (formEdit.value.id && formEdit.value.imagenes?.length > 0) {
      this.previewImages = this.imageHandler.loadImagesForPreview(
        formEdit.value.imagenes,
        { baseUrl: this.IMAGE_BASE_URL }
      );
    }
  }

  get form() {
    // Si hay id, usar formEdit, sino formNew
    const tieneId = this.articulosService.formEdit.value.id;
    return tieneId
      ? this.articulosService.formEdit
      : this.articulosService.formNew;
  }

  get canSave(): boolean {
    return this.form.valid;
  }

  cerrarModal() {
    this.ref.close();
  }

  abrirSelectorArchivos(): void {
    this.fileInput?.nativeElement?.click();
  }

  onArchivosSeleccionados(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files ? Array.from(input.files) : [];
    if (files.length) {
      this.agregarArchivos(files);
      input.value = '';
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    const files = event.dataTransfer
      ? Array.from(event.dataTransfer.files)
      : [];
    if (files.length) {
      this.agregarArchivos(files);
    }
  }

  eliminarImagen(index: number): void {
    // Simplemente eliminar de la lista
    this.previewImages.splice(index, 1);
    this.adjustImageIndex();
  }

  anteriorImagen(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  siguienteImagen(): void {
    if (this.currentImageIndex < this.previewImages.length - 1) {
      this.currentImageIndex++;
    }
  }

  seleccionarImagen(index: number): void {
    this.currentImageIndex = index;
  }

  async crearArticulo(): Promise<void> {
    const usuario = this.authService.currentState;
    const formEdit = this.articulosService.formEdit;
    const formNew = this.articulosService.formNew;

    if (formEdit.value.id) {
      // EDITAR - PUT
      if (formEdit.invalid) return;

      // Convertir todas las imágenes del preview (existentes + nuevas) a Files
      const todasLasImagenes = await this.imageHandler.previewImagesToFiles(
        this.previewImages,
        this.IMAGE_BASE_URL
      );

      this.articulosService
        .actualizar(formEdit.value.id, todasLasImagenes, usuario.id)
        .subscribe({
          next: (response) => {
            this.resetForm();
            this.articulosService.getMisArticulos(usuario.id);
            this.ref.close({ success: true, data: response });
          },
          error: (error) => {
            console.error('Error al actualizar artículo:', error);
          },
        });
    } else {
      // CREAR - POST
      if (formNew.invalid || this.previewImages.length === 0) return;

      // Convertir todas las imágenes del preview a Files
      const todasLasImagenes = await this.imageHandler.previewImagesToFiles(
        this.previewImages,
        this.IMAGE_BASE_URL
      );

      this.articulosService.crear(usuario.id, todasLasImagenes).subscribe({
        next: (response) => {
          this.resetForm();
          this.articulosService.getMisArticulos(usuario.id);
          this.ref.close({ success: true, data: response });
        },
        error: (error) => {
          console.error('Error al crear artículo:', error);
        },
      });
    }
  }

  private async agregarArchivos(files: File[]): Promise<void> {
    const espacioDisponible = this.MAX_IMAGES - this.previewImages.length;
    if (espacioDisponible <= 0) return;

    const archivosParaAgregar = files
      .filter((f) => f.type.startsWith('image/'))
      .slice(0, espacioDisponible);

    const base64Images = await this.imageHandler.filesToBase64(
      archivosParaAgregar
    );

    this.previewImages.push(...base64Images);
  }

  private adjustImageIndex(): void {
    if (this.currentImageIndex >= this.previewImages.length) {
      this.currentImageIndex = Math.max(0, this.previewImages.length - 1);
    }
  }

  private resetForm(): void {
    this.form.reset();
    this.previewImages = [];
    this.currentImageIndex = 0;
  }
}
