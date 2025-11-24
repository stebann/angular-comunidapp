import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImageUrlService } from 'src/app/core/services/image-url.service';
import { DetalleComercio } from '../../../models/detalle-comercio.model';

@Component({
  selector: 'app-modal-info-comercio',
  templateUrl: './modal-info-comercio.component.html',
  styleUrls: ['./modal-info-comercio.component.scss'],
})
export class ModalInfoComercioComponent implements OnInit {
  comercio: DetalleComercio | null = null;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private imageUrlService: ImageUrlService
  ) {}

  ngOnInit(): void {
    if (this.config.data) {
      this.comercio = this.config.data.comercio;
    }
  }

  getImagenComercio(): string {
    return this.imageUrlService.getImagenFromArray(
      this.comercio?.imagenes || []
    );
  }

  get totalCategorias(): number {
    return this.comercio?.categorias?.length || 0;
  }

  get totalArticulos(): number {
    return this.comercio?.articulos?.length || 0;
  }
}
