import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-placeholder',
  templateUrl: './empty-placeholder.component.html',
  styleUrls: ['./empty-placeholder.component.scss'],
})
export class EmptyPlaceholderComponent {
  @Input() icon: string = 'pi pi-box';
  @Input() title: string = 'Sin registros disponibles';
  @Input() description: string =
    'No hay elementos para mostrar en este momento';
}
