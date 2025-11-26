import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { ImageModerationService } from 'src/app/core/services/image-moderation.service';
import { AppMessagesServices } from 'src/app/core/services/toas.service';
import { TipoTransaccion } from 'src/app/shared/enums/articulo.enums';
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
  condiciones: FilterOption[] = [];
  tiposTransaccion: FilterOption[] = [];
  tipoTransaccionVenta = TipoTransaccion.Venta;

  isDragOver = false;
  previewImages: string[] = [];
  currentImageIndex = 0;

  private readonly IMAGE_BASE_URL = 'http://localhost:8080/api/archivos/imagen';
  private readonly MAX_IMAGES = 5;

  constructor(
    public ref: DynamicDialogRef,
    private filtersService: FiltersService,
    private articulosService: MisArticulosService,
    private authService: AuthService,
    private imageHandler: ImageHandlerService,
    private imageModeration: ImageModerationService,
    private appMessages: AppMessagesServices
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
      .getCondiciones()
      .subscribe((condiciones) => (this.condiciones = condiciones));

    this.filtersService.getTiposTransaccion().subscribe((tipos) => {
      this.tiposTransaccion = tipos;
      this.updatePrecioValidation();
    });
  }

  private setupPrecioValidation(): void {
    this.form.get('tipoTransaccionCodigo')?.valueChanges.subscribe(() => {
      this.updatePrecioValidation();
    });
  }

  private updatePrecioValidation(): void {
    const tipoTransaccionCodigo = this.form.get('tipoTransaccionCodigo')?.value;
    const precioControl = this.form.get('precio');

    if (tipoTransaccionCodigo === TipoTransaccion.Venta) {
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
    const formEdit = this.articulosService.formEdit;
    const formNew = this.articulosService.formNew;

    if (formEdit.value.id) {
      // Modo edición: solo necesita formulario válido
      return formEdit.valid;
    } else {
      // Modo creación: necesita formulario válido Y al menos una imagen
      return formNew.valid && this.previewImages.length > 0;
    }
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

    // Validar imágenes antes de agregarlas
    for (const file of archivosParaAgregar) {
      const isValid = await this.imageModeration
        .validateImage(file)
        .toPromise();

      if (!isValid) {
        this.appMessages.advertencia(
          'No se puede subir esta imagen. Contiene contenido inapropiado (violento, sexual, etc.).',
          'Imagen rechazada'
        );
        continue; // Saltar esta imagen
      }

      // Si es válida, convertir a base64 y agregar
      const base64Images = await this.imageHandler.filesToBase64([file]);
      this.previewImages.push(...base64Images);
    }
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
