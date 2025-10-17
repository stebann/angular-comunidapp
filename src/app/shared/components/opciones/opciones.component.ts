import { Component, Input, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.scss'],
})
export class OpcionesComponent {
  @Input() items: any;
  @Input() color: 'white' | 'blue' = 'white';
  @ViewChild('op') overlayPanel!: OverlayPanel;
  eventValue: Event | undefined;

  ejecutarFuncion(funcion: any, target: any) {
    if (funcion) {
      funcion();
    }
    this.overlayPanel.toggle({ currentTarget: target });
  }
  open(event: Event) {
    this.eventValue = event;
  }
}
