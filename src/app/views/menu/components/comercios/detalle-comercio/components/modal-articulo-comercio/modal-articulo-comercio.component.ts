import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FilterOption } from 'src/app/shared/models/filter-models';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { ImageHandlerService } from 'src/app/shared/services/image-handler.service';
import { ComercioService } from '../../../services/comercio.service';

@Component({
  selector: 'app-modal-articulo-comercio',
  templateUrl: './modal-articulo-comercio.component.html',
  styleUrls: ['./modal-articulo-comercio.component.scss'],
})
export class ModalArticuloComercioComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  categorias: FilterOption[] = [];
  condiciones: FilterOption[] = [];
  categoriasArticulosComercio: FilterOption[] = [];

  isDragOver = false;
  previewImages: string[] = [];
  currentImageIndex = 0;

  private readonly MAX_IMAGES = 5;
  comercioId: number = 0;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private filtersService: FiltersService,
    public comercioService: ComercioService,
    private imageHandler: ImageHandlerService
  ) {
    // Obtener comercioId del config
    this.comercioId = this.config.data?.comercioId || 0;
  }

  ngOnInit(): void {
    this.loadFilters();
    this.loadCategoriasArticulosComercio();
    // Resetear el formulario para crear nuevo artículo
    this.comercioService.formArticuloComercio.reset();
  }

  private loadCategoriasArticulosComercio(): void {
    this.filtersService
      .getCategoriasArticulosComercio(this.comercioId)
      .subscribe(
        (categorias: FilterOption[]) =>
          (this.categoriasArticulosComercio = categorias)
      );
  }

  private loadFilters(): void {
    this.filtersService
      .getCategorias()
      .subscribe(
        (categorias: FilterOption[]) => (this.categorias = categorias)
      );

    this.filtersService
      .getCondiciones()
      .subscribe(
        (condiciones: FilterOption[]) => (this.condiciones = condiciones)
      );
  }

  get form() {
    return this.comercioService.formArticuloComercio;
  }

  get canSave(): boolean {
    const form = this.comercioService.formArticuloComercio;
    // Modo creación: necesita formulario válido Y al menos una imagen
    return form.valid && this.previewImages.length > 0;
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
    const form = this.comercioService.formArticuloComercio;

    // CREAR - POST
    if (form.invalid || this.previewImages.length === 0) return;

    // Convertir imágenes a Files si hay
    let imagenes: File[] = [];
    if (this.previewImages.length > 0) {
      imagenes = await this.imageHandler.previewImagesToFiles(
        this.previewImages
      );
    }

    this.comercioService
      .crearArticuloComercio(this.comercioId, imagenes)
      .subscribe({
        next: (response) => {
          this.resetForm();
          this.ref.close({ success: true, data: response });
        },
        error: (error) => {
          console.error('Error al crear artículo:', error);
        },
      });
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
