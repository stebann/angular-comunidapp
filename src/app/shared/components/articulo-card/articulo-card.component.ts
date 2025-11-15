import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-articulo-card',
  templateUrl: './articulo-card.component.html',
  styleUrls: ['./articulo-card.component.scss'],
})
export class ArticuloCardComponent {
  @Input() articulo: any;
  @Input() esDueno: boolean = false;
  selectItem: any = null;
  @Input() menuItems: any[] = [];
  @Output() cardClicked = new EventEmitter<any>();
  @Output() menuOpened = new EventEmitter<any>();

  onCardClick() {
    this.cardClicked.emit(this.articulo);
  }

  onMenuClick(): void {
    this.menuOpened.emit(this.articulo);
  }

  constructor() {}

  getImagenSrc(): string {
    if (this.articulo?.imagenes && this.articulo.imagenes.length > 0) {
      const imageName = this.articulo.imagenes[0];
      if (imageName.startsWith('http')) {
        return imageName;
      }
      return `http://localhost:8080/api/articulo/imagen/${imageName}`;
    }
    return (
      'https://picsum.photos/600/400?random=' +
      (Math.floor(Math.random() * 1000) + 1)
    );
  }
}
