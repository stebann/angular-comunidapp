import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Articulo } from '../../models/articulo.model';
import { ImageViewerService } from '../../services/image-viewer.service';
import { ArticuloDetailService } from './services/articulo-detail.service';

@Component({
  selector: 'app-articulo-detail',
  templateUrl: './articulo-detail.component.html',
  styleUrls: ['./articulo-detail.component.scss'],
})
export class ArticuloDetailComponent implements OnInit {
  articulo?: Articulo;
  currentImageIndex = 0;
  detallesExpanded = true;
  propietarioExpanded = true;

  private readonly IMAGE_BASE_URL = 'http://localhost:8080/api/articulo/imagen';

  constructor(
    public config: DynamicDialogConfig,
    private articuloDetailService: ArticuloDetailService,
    private imageViewerService: ImageViewerService
  ) {}

  ngOnInit(): void {
    if (this.config.data?.articulo) {
      this.articulo = this.config.data.articulo;
    } else if (this.config.data?.articuloId) {
      this.articuloDetailService
        .obtenerArticuloById(this.config.data.articuloId)
        .subscribe((articulo: Articulo) => {
          this.articulo = articulo;
        });
    }
  }

  getImagenSrc(imagen: string): string {
    return `${this.IMAGE_BASE_URL}/${imagen}`;
  }

  toggleDetalles(): void {
    this.detallesExpanded = !this.detallesExpanded;
  }

  togglePropietario(): void {
    this.propietarioExpanded = !this.propietarioExpanded;
  }

  solicitarArticulo(): void {
    // TODO: Implementar lógica para solicitar artículo
    console.log('Solicitar artículo:', this.articulo?.id);
  }

  openImageViewer(): void {
    if (this.articulo?.imagenes && this.articulo.imagenes.length > 0) {
      this.imageViewerService.openViewer({
        images: this.articulo.imagenes,
        currentIndex: this.currentImageIndex,
        imageBaseUrl: this.IMAGE_BASE_URL,
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

  // Getters con valores por defecto para mostrar el diseño
  get titulo(): string {
    return this.articulo?.titulo || 'MacBook Pro 14-inch';
  }

  get categoriaNombre(): string {
    return this.articulo?.categoriaNombre || 'Electrónica';
  }

  get descripcion(): string {
    return (
      this.articulo?.descripcion ||
      'Chip M2 Pro, 16GB RAM, 512GB SSD. Usado para trabajo y proyectos personales.'
    );
  }

  get fechaCompra(): string {
    return this.articulo?.fechaCompra || '2023-05-10';
  }

  get valor(): number {
    return this.articulo?.valor || 1999.0;
  }

  get propietarioNombre(): string {
    return this.articulo?.propietario?.nombre || 'Alex Doe';
  }

  get propietarioCorreo(): string {
    return this.articulo?.propietario?.correo || 'alex.doe@example.com';
  }

  get propietarioTelefono(): string {
    return this.articulo?.propietario?.telefono || '+1 (555) 123-4567';
  }

  get propietarioDireccion(): string {
    return this.articulo?.propietario?.direccion || '123 Main St, Anytown, USA';
  }

  get estaDisponible(): boolean {
    return this.articulo?.estadoArticuloCodigo === 1 || true;
  }
}
