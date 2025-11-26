import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { ImageModerationService } from 'src/app/core/services/image-moderation.service';
import { AppMessagesServices } from 'src/app/core/services/toas.service';
import { FilterOption } from 'src/app/shared/models/filter-models';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { ImageHandlerService } from 'src/app/shared/services/image-handler.service';
import { MisNegociosService } from '../../services/mis-negocios.service';

@Component({
  selector: 'app-add-comercio-modal',
  templateUrl: './add-comercio-modal.component.html',
  styleUrls: ['./add-comercio-modal.component.scss'],
})
export class AddComercioModalComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  isSubmitting: boolean = false;
  isDragOver = false;
  previewImages: string[] = [];
  currentImageIndex = 0;
  categoriasComercios: FilterOption[] = [];
  private readonly MAX_IMAGES = 5;

  get isEditMode(): boolean {
    return !!this.config.data?.comercioId;
  }

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public misNegociosService: MisNegociosService,
    private imageHandler: ImageHandlerService,
    private filtersService: FiltersService,
    private authService: AuthService,
    private imageModeration: ImageModerationService,
    private appMessages: AppMessagesServices
  ) {}

  get comercioForm() {
    return this.misNegociosService.formComercio;
  }

  ngOnInit(): void {
    this.filtersService.getCategoriasComercios().subscribe((categorias) => {
      this.categoriasComercios = categorias;
    });

    this.loadExistingImages();
  }

  onCancel(): void {
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

  eliminarImagen(index: number): void {
    this.previewImages.splice(index, 1);
    if (this.currentImageIndex >= this.previewImages.length) {
      this.currentImageIndex = Math.max(0, this.previewImages.length - 1);
    }
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

  async onSubmit(): Promise<void> {
    if (this.comercioForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      // Convertir todas las imágenes del preview (existentes + nuevas) a Files
      const imagenes = await this.imageHandler.previewImagesToFiles(
        this.previewImages
      );

      const usuarioId = this.authService.currentState.id;
      const comercioId = this.config.data?.comercioId as number | undefined;

      const request$ = comercioId
        ? this.misNegociosService.actualizarComercio(
            comercioId,
            imagenes,
            usuarioId
          )
        : this.misNegociosService.crearComercio(imagenes, usuarioId);

      request$.subscribe({
        next: () => {
          this.misNegociosService.getComerciosPorUsuario();
          this.ref.close('success');
        },
        error: (error) => {
          console.error('Error al guardar comercio:', error);
          this.isSubmitting = false;
        },
      });
    }
  }

  private loadExistingImages(): void {
    const imagenes = this.config.data?.imagenes as string[] | undefined;
    if (imagenes && imagenes.length > 0) {
      this.previewImages = this.imageHandler.loadImagesForPreview(imagenes);
    }
  }
}
