import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageUrlService } from 'src/app/core/services/image-url.service';
import { ImageHandlerService } from 'src/app/shared/services/image-handler.service';

@Component({
  selector: 'app-comercio-card-detalle',
  templateUrl: './comercio-card-detalle.component.html',
  styleUrls: ['./comercio-card-detalle.component.scss'],
})
export class ComercioCardDetalleComponent {
  @Input() comercio: any;
  @Input() esDueno: boolean = false;
  @Input() menuItems: any[] = [];
  @Output() cardClicked = new EventEmitter<any>();
  @Output() menuOpened = new EventEmitter<any>();

  constructor(
    private imageHandler: ImageHandlerService,
    private imageUrlService: ImageUrlService
  ) {}

  getImagenSrc(): string {
    return this.imageUrlService.getImagenFromArray(
      this.comercio?.imagenes || []
    );
  }

  onCardClick() {
    this.cardClicked.emit(this.comercio);
  }
}
