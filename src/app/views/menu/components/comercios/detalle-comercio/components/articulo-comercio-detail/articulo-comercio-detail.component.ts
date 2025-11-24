import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { API_ENDPOINTS } from 'src/app/core/constants/api-endpoints';
import { ImageUrlService } from 'src/app/core/services/image-url.service';
import { ImageViewerService } from 'src/app/shared/services/image-viewer.service';
import { ArticuloComercio } from '../../../models/detalle-comercio.model';

@Component({
  selector: 'app-articulo-comercio-detail',
  templateUrl: './articulo-comercio-detail.component.html',
  styleUrls: ['./articulo-comercio-detail.component.scss'],
})
export class ArticuloComercioDetailComponent implements OnInit {
  articulo?: ArticuloComercio;
  currentImageIndex = 0;
  isLoading: boolean = true;

  constructor(
    public config: DynamicDialogConfig,
    private imageViewerService: ImageViewerService,
    public ref: DynamicDialogRef,
    private imageUrlService: ImageUrlService
  ) {}

  ngOnInit(): void {
    if (this.config.data?.articulo) {
      this.articulo = this.config.data.articulo;
      this.isLoading = false;
    } else {
      this.isLoading = false;
    }
  }

  getImagenSrc(imagen: string): string {
    return this.imageUrlService.getImagenSrc(imagen);
  }

  openImageViewer(): void {
    if (this.articulo?.imagenes && this.articulo.imagenes.length > 0) {
      this.imageViewerService.openViewer({
        images: this.articulo.imagenes,
        currentIndex: this.currentImageIndex,
        imageBaseUrl: API_ENDPOINTS.IMAGE_BASE_URL,
      });
    }
  }

  nextImage(): void {
    if (
      this.articulo?.imagenes &&
      this.currentImageIndex < this.articulo.imagenes.length - 1
    ) {
      this.currentImageIndex++;
    }
  }

  prevImage(): void {
    if (this.articulo?.imagenes && this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  canGoNext(): boolean {
    return (
      !!this.articulo?.imagenes &&
      this.currentImageIndex < this.articulo.imagenes.length - 1
    );
  }

  canGoPrev(): boolean {
    return !!this.articulo?.imagenes && this.currentImageIndex > 0;
  }

  get titulo(): string {
    return this.articulo?.titulo || '';
  }

  get categoriaNombre(): string {
    return this.articulo?.categoriaArticuloComercioNombre || '';
  }

  get descripcion(): string {
    return this.articulo?.descripcion || '';
  }

  get precio(): number | undefined {
    return this.articulo?.precio;
  }

  get condicionNombre(): string {
    return this.articulo?.condicionNombre || 'No especificada';
  }
}
