import { Component, HostListener, OnInit } from '@angular/core';
import { ImageViewerService } from '../../services/image-viewer.service';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent implements OnInit {
  isOpen = false;
  images: string[] = [];
  currentIndex = 0;
  imageBaseUrl = '';

  constructor(private imageViewerService: ImageViewerService) {}

  ngOnInit(): void {
    this.imageViewerService.viewerState.subscribe((state) => {
      this.isOpen = state.isOpen;
      if (state.data) {
        this.images = state.data.images;
        this.currentIndex = state.data.currentIndex || 0;
        this.imageBaseUrl = state.data.imageBaseUrl || '';
      }
    });
  }

  closeViewer(): void {
    this.imageViewerService.closeViewer();
  }

  getImageSrc(image: string): string {
    if (this.imageBaseUrl) {
      return `${this.imageBaseUrl}/${image}`;
    }
    return image;
  }

  nextImage(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
      this.imageViewerService.setCurrentIndex(this.currentIndex);
    }
  }

  prevImage(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.imageViewerService.setCurrentIndex(this.currentIndex);
    }
  }

  canGoNext(): boolean {
    return this.currentIndex < this.images.length - 1;
  }

  canGoPrev(): boolean {
    return this.currentIndex > 0;
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent): void {
    if (this.isOpen) {
      this.closeViewer();
    }
  }

  @HostListener('document:keydown.arrowright', ['$event'])
  handleArrowRight(event: KeyboardEvent): void {
    if (this.isOpen) {
      this.nextImage();
    }
  }

  @HostListener('document:keydown.arrowleft', ['$event'])
  handleArrowLeft(event: KeyboardEvent): void {
    if (this.isOpen) {
      this.prevImage();
    }
  }
}
