import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Articulo } from '../../models/articulo.model';
import { ArticuloDetailService } from './services/articulo-detail.service';

@Component({
  selector: 'app-articulo-detail',
  templateUrl: './articulo-detail.component.html',
  styleUrls: ['./articulo-detail.component.scss'],
})
export class ArticuloDetailComponent implements OnInit {
  articulo?: Articulo;
  currentImageIndex = 0;

  private readonly IMAGE_BASE_URL = 'http://localhost:8080/api/articulo/imagen';

  constructor(
    public config: DynamicDialogConfig,
    private articuloDetailService: ArticuloDetailService
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

  anteriorImagen(): void {
    if (this.articulo?.imagenes && this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  siguienteImagen(): void {
    if (
      this.articulo?.imagenes &&
      this.currentImageIndex < this.articulo.imagenes.length - 1
    ) {
      this.currentImageIndex++;
    }
  }
}
