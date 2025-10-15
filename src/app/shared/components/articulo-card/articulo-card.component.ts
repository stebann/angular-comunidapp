import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-articulo-card',
  templateUrl: './articulo-card.component.html',
  styleUrls: ['./articulo-card.component.scss'],
})
export class ArticuloCardComponent {
  @Input() articulo: any;
}
