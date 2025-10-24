import { Component, ElementRef, ViewChild } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MisArticulosService } from '../../services/mis-articulos.service';

@Component({
  selector: 'app-modal-articulo',
  templateUrl: './modal-articulo.component.html',
  styleUrls: ['./modal-articulo.component.scss'],
})
export class ModalArticuloComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  photos: string[] = [];
  currentPhotoIndex: number = 0;

  constructor(
    public ref: DynamicDialogRef,
    public service: MisArticulosService
  ) {}

  get form() {
    return this.service.formMisArticulos;
  }

  onPhotoUpload(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      Array.from(input.files).forEach((file) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target?.result) {
              this.photos.push(e.target.result as string);
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }

  removePhoto(index: number): void {
    this.photos.splice(index, 1);
    if (this.currentPhotoIndex >= this.photos.length) {
      this.currentPhotoIndex = Math.max(0, this.photos.length - 1);
    }
  }

  nextPhoto(): void {
    if (this.currentPhotoIndex < this.photos.length - 1) {
      this.currentPhotoIndex++;
    }
  }

  previousPhoto(): void {
    if (this.currentPhotoIndex > 0) {
      this.currentPhotoIndex--;
    }
  }

  goToPhoto(index: number): void {
    this.currentPhotoIndex = index;
  }

  submit() {
    if (this.form.valid) {
      const formData = {
        ...this.form.value,
        photos: this.photos,
      };
      this.ref.close(formData);
    }
  }

  close() {
    this.ref.close();
  }
}
