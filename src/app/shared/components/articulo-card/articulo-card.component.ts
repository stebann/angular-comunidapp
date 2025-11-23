import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageUrlService } from 'src/app/core/services/image-url.service';
import { ImageHandlerService } from '../../services/image-handler.service';

@Component({
  selector: 'app-articulo-card',
  templateUrl: './articulo-card.component.html',
  styleUrls: ['./articulo-card.component.scss'],
})
export class ArticuloCardComponent {
  @Input() articulo: any;
  @Input() esDueno: boolean = false;
  @Input() menuItems: any[] = [];
  @Output() cardClicked = new EventEmitter<any>();
  @Output() menuOpened = new EventEmitter<any>();

  constructor(
    private imageHandler: ImageHandlerService,
    private imageUrlService: ImageUrlService
  ) {}

  getImagenSrc(): string {
    return this.imageUrlService.getImagenFromArray(this.articulo?.imagenes);
  }

  onCardClick() {
    this.cardClicked.emit(this.articulo);
  }
}
