import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { API_ENDPOINTS } from 'src/app/core/constants/api-endpoints';
import { ImageModerationService } from 'src/app/core/services/image-moderation.service';
import { ImageUrlService } from 'src/app/core/services/image-url.service';
import { AppMessagesServices } from 'src/app/core/services/toas.service';
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
  articuloId: number | null = null;
  isEditing: boolean = false;
  articulo: any = null;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private filtersService: FiltersService,
    public comercioService: ComercioService,
    private imageHandler: ImageHandlerService,
    private imageUrlService: ImageUrlService,
    private imageModeration: ImageModerationService,
    private appMessages: AppMessagesServices
  ) {
    // Obtener comercioId y articuloId del config
    this.comercioId = this.config.data?.comercioId || 0;
    this.isEditing = this.config.data?.isEditing || false;
    this.articuloId =
      this.config.data?.articuloId || this.config.data?.articulo?.id || null;
  }

  ngOnInit(): void {
    this.loadFilters();
    this.loadCategoriasArticulosComercio();

    if (this.isEditing && this.articuloId) {
      this.cargarDatosArticulo();
    } else {
      // Resetear el formulario para crear nuevo artículo
      this.comercioService.formArticuloComercio.reset();
    }
  }

  private cargarDatosArticulo(): void {
    if (!this.articuloId || !this.comercioId) {
      return;
    }

    // Obtener los datos completos del artículo desde el endpoint
    this.comercioService
      .getArticuloComercioPorId(this.comercioId, this.articuloId)
      .subscribe({
        next: (articulo) => {
          this.articulo = articulo;
          this.cargarDatosEnFormulario(articulo);
        },
        error: (error) => {
          console.error('Error al cargar el artículo:', error);
        },
      });
  }

  private cargarDatosEnFormulario(articulo: any): void {
    const form = this.comercioService.formArticuloComercio;

    // Cargar datos del formulario
    form.patchValue({
      titulo: articulo.titulo,
      descripcion: articulo.descripcion,
      categoriaCodigo: articulo.categoriaCodigo,
      condicionCodigo: articulo.condicionCodigo,
      precio: articulo.precio,
      categoriaComercioId: articulo.categoriaArticuloComercioId,
    });

    // Cargar imágenes existentes
    if (articulo.imagenes && articulo.imagenes.length > 0) {
      this.cargarImagenesExistentes(articulo.imagenes);
    }
  }

  private cargarImagenesExistentes(imagenes: string[]): void {
    // Cargar las URLs de las imágenes existentes
    this.previewImages = imagenes.map((img) => {
      // Si la imagen ya es una URL completa, usarla directamente
      if (
        img.startsWith('http://') ||
        img.startsWith('https://') ||
        img.startsWith('data:')
      ) {
        return img;
      }
      // Si no, construir la URL completa usando el servicio
      return this.imageUrlService.getImagenSrc(img);
    });

    this.currentImageIndex = 0;
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
    // Modo edición: solo necesita formulario válido (puede mantener imágenes existentes)
    if (this.isEditing) {
      return form.valid;
    }
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

    if (this.isEditing) {
      await this.actualizarArticulo();
    } else {
      await this.crearNuevoArticulo();
    }
  }

  private async crearNuevoArticulo(): Promise<void> {
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

  private async actualizarArticulo(): Promise<void> {
    const form = this.comercioService.formArticuloComercio;

    // ACTUALIZAR - PUT
    if (form.invalid || !this.articuloId) return;

    // Convertir TODAS las imágenes del preview (existentes + nuevas) a Files
    // Esto incluye las imágenes existentes (URLs) y las nuevas (base64)
    let imagenes: File[] = [];
    if (this.previewImages.length > 0) {
      // Usar la URL base de la API para extraer correctamente los nombres de archivo
      const baseUrl = API_ENDPOINTS.IMAGE_BASE_URL;

      imagenes = await this.imageHandler.previewImagesToFiles(
        this.previewImages,
        baseUrl
      );
    }

    this.comercioService
      .actualizarArticuloComercio(this.comercioId, this.articuloId, imagenes)
      .subscribe({
        next: (response) => {
          this.resetForm();
          this.ref.close({ success: true, data: response });
        },
        error: (error) => {
          console.error('Error al actualizar artículo:', error);
        },
      });
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
