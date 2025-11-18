import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsuarioInfo } from '../../models/articulo.model';


@Component({
  selector: 'app-usuario-info-modal',
  templateUrl: './usuario-info-modal.component.html',
  styleUrls: ['./usuario-info-modal.component.scss'],
})
export class UsuarioInfoModalComponent {
  usuario: UsuarioInfo;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    this.usuario = this.config.data.usuario;
  }

  getInitials(nombre: string): string {
    if (!nombre) return '';
    const parts = nombre.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0).toUpperCase() +
      parts[parts.length - 1].charAt(0).toUpperCase()
    );
  }

  onClose(): void {
    this.ref.close();
  }
}
