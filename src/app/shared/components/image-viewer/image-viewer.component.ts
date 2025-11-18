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
  zoomLevel = 1;
  minZoom = 1;
  maxZoom = 3;
  isDragging = false;
  dragStartX = 0;
  dragStartY = 0;
  translateX = 0;
  translateY = 0;
  dragSensitivity = 0.7; 

  constructor(private imageViewerService: ImageViewerService) {}

  ngOnInit(): void {
    this.imageViewerService.viewerState.subscribe((state) => {
      this.isOpen = state.isOpen;
      if (state.data) {
        this.images = state.data.images;
        this.currentIndex = state.data.currentIndex || 0;
        this.imageBaseUrl = state.data.imageBaseUrl || '';
        this.resetZoom();
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
      this.resetPosition();
    }
  }

  prevImage(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.imageViewerService.setCurrentIndex(this.currentIndex);
      this.resetPosition();
    }
  }

  canGoNext(): boolean {
    return this.currentIndex < this.images.length - 1;
  }

  canGoPrev(): boolean {
    return this.currentIndex > 0;
  }


  zoomIn(): void {
    if (this.zoomLevel < this.maxZoom) {
      this.zoomLevel = Math.min(this.zoomLevel + 0.5, this.maxZoom);
    }
  }

  zoomOut(): void {
    if (this.zoomLevel > this.minZoom) {
      this.zoomLevel = Math.max(this.zoomLevel - 0.5, this.minZoom);
      if (this.zoomLevel === 1) {
        this.resetPosition();
      }
    }
  }

  resetZoom(): void {
    this.zoomLevel = 1;
    this.resetPosition();
  }

  resetPosition(): void {
    this.translateX = 0;
    this.translateY = 0;
  }

 
  onWheel(event: WheelEvent): void {
    event.preventDefault();
    if (event.deltaY < 0) {
      this.zoomIn();
    } else {
      this.zoomOut();
    }
  }


  onMouseDown(event: MouseEvent): void {
    if (this.zoomLevel > 1) {
      this.isDragging = true;
      this.dragStartX = event.clientX - this.translateX;
      this.dragStartY = event.clientY - this.translateY;
      event.preventDefault();
    }
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isDragging && this.zoomLevel > 1) {
      const newTranslateX = event.clientX - this.dragStartX;
      const newTranslateY = event.clientY - this.dragStartY;
  
      const smoothX = this.translateX + (newTranslateX - this.translateX) * this.dragSensitivity;
      const smoothY = this.translateY + (newTranslateY - this.translateY) * this.dragSensitivity;

      this.translateX = this.constrainTranslation(smoothX, smoothY).x;
      this.translateY = this.constrainTranslation(smoothX, smoothY).y;
    }
  }


  constrainTranslation(x: number, y: number): {x: number, y: number} {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
  
    const minVisibleWidth = viewportWidth * 0.2;
    const minVisibleHeight = viewportHeight * 0.2;
    
    const maxTranslateX = Math.max(0, (viewportWidth * (this.zoomLevel - 1)) / 2) - minVisibleWidth;
    const maxTranslateY = Math.max(0, (viewportHeight * (this.zoomLevel - 1)) / 2) - minVisibleHeight;
    

    const constrainedX = Math.max(-maxTranslateX, Math.min(maxTranslateX, x));
    const constrainedY = Math.max(-maxTranslateY, Math.min(maxTranslateY, y));
    
    return { x: constrainedX, y: constrainedY };
  }

  onMouseUp(): void {
    this.isDragging = false;
  }


  onTouchStart(event: TouchEvent): void {
    if (this.zoomLevel > 1 && event.touches.length === 1) {
      this.isDragging = true;
      this.dragStartX = event.touches[0].clientX - this.translateX;
      this.dragStartY = event.touches[0].clientY - this.translateY;
    }
  }

  onTouchMove(event: TouchEvent): void {
    if (this.isDragging && this.zoomLevel > 1 && event.touches.length === 1) {
      const newTranslateX = event.touches[0].clientX - this.dragStartX;
      const newTranslateY = event.touches[0].clientY - this.dragStartY;
 
      const smoothX = this.translateX + (newTranslateX - this.translateX) * this.dragSensitivity;
      const smoothY = this.translateY + (newTranslateY - this.translateY) * this.dragSensitivity;
      
 
      this.translateX = this.constrainTranslation(smoothX, smoothY).x;
      this.translateY = this.constrainTranslation(smoothX, smoothY).y;
    }
  }

  onTouchEnd(): void {
    this.isDragging = false;
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


  onDoubleClick(): void {
    this.resetZoom();
  }
}
