import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageUrlService } from 'src/app/core/services/image-url.service';
import { Comercio } from '../../models/comercio.model';

@Component({
  selector: 'app-comercio-card',
  templateUrl: './comercio-card.component.html',
  styleUrls: ['./comercio-card.component.scss'],
})
export class ComercioCardComponent {
  @Input() comercio!: Comercio;
  @Input() cardType: 'mis-negocios' | 'comercios' = 'comercios';
  @Input() esDueno: boolean = false;
  @Input() menuItems: any[] = [];
  @Output() cardClicked = new EventEmitter<Comercio>();
  @Output() menuOpened = new EventEmitter<Comercio>();

  constructor(private imageUrlService: ImageUrlService) {}

  getImagenSrc(): string {
    return this.imageUrlService.getImagenFromArray(this.comercio?.imagenes);
  }

  onCardClick(): void {
    this.cardClicked.emit(this.comercio);
  }
}
