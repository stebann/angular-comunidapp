import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

export interface PrestamoArticulo {
  destinatario: string;
  fechaInicio: Date;
  fechaFin: Date;
  estado: string;
}

export interface ArticuloDetalle {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  categoriaNombre: string;
  estadoNombre: string;
  tipoTransaccionNombre: string;
  imagenes: string[];
  usuarioId: number;
  disponible: boolean;
  prestamo?: PrestamoArticulo;
}

export interface Propietario {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
}

@Component({
  selector: 'app-articulo-detail',
  templateUrl: './articulo-detail.component.html',
  styleUrls: ['./articulo-detail.component.scss'],
})
export class ArticuloDetailComponent implements OnInit {
  @Input() articulo!: ArticuloDetalle;
  @Input() propietario!: Propietario;
  @Input() puedeSolicitar: boolean = false;
  @Input() yaSolicitado: boolean = false;

  currentImageIndex = 0;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    if (this.config.data) {
      this.articulo = this.config.data.articulo;
      this.propietario = this.config.data.propietario;
      this.puedeSolicitar = this.config.data.puedeSolicitar ?? false;
      this.yaSolicitado = this.config.data.yaSolicitado ?? false;
    }
  }

  anteriorImagen(): void {
    if (this.currentImageIndex > 0) {
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

  cerrarModal(): void {
    this.ref.close();
  }

  solicitar(): void {
    // TODO: Implementar lógica de solicitud
    console.log('Solicitar artículo:', this.articulo.id);
    this.ref.close({ action: 'solicitar' });
  }

  cancelarSolicitud(): void {
    // TODO: Implementar lógica de cancelación
    console.log('Cancelar solicitud:', this.articulo.id);
    this.ref.close({ action: 'cancelar' });
  }
}
