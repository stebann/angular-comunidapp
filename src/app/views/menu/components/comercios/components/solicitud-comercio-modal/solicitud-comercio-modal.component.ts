import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImageHandlerService } from 'src/app/shared/services/image-handler.service';
import { ComercioService } from '../../services/comercio.service';

@Component({
  selector: 'app-solicitud-comercio-modal',
  templateUrl: './solicitud-comercio-modal.component.html',
  styleUrls: ['./solicitud-comercio-modal.component.scss'],
})
export class SolicitudComercioModalComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  solicitudForm: FormGroup;
  isSubmitting: boolean = false;
  isDragOver = false;
  previewImages: string[] = [];
  currentImageIndex = 0;
  private readonly MAX_IMAGES = 5;

  constructor(
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    private comercioService: ComercioService,
    private imageHandler: ImageHandlerService
  ) {
    this.solicitudForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
    });
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

    const base64Images = await this.imageHandler.filesToBase64(
      archivosParaAgregar
    );

    this.previewImages.push(...base64Images);
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
    if (this.solicitudForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      // Convertir imágenes a Files si hay
      let imagenes: File[] = [];
      if (this.previewImages.length > 0) {
        imagenes = await this.imageHandler.previewImagesToFiles(
          this.previewImages
        );
      }

      const formData = new FormData();
      formData.append('nombre', this.solicitudForm.value.nombre);
      formData.append('descripcion', this.solicitudForm.value.descripcion);
      formData.append('direccion', this.solicitudForm.value.direccion);
      formData.append('telefono', this.solicitudForm.value.telefono);

      // Agregar imágenes al FormData
      imagenes.forEach((file, index) => {
        formData.append('imagenes', file);
      });

      this.comercioService.crearSolicitud(formData).subscribe({
        next: () => {
          this.ref.close('success');
        },
        error: (error) => {
          console.error('Error al crear solicitud:', error);
          this.isSubmitting = false;
        },
      });
    }
  }
}
