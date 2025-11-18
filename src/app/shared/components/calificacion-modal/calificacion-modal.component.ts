import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface CalificacionData {
  usuarioId: number;
  nombreUsuario: string;
}

export interface CalificacionResult {
  calificacion: number;
  comentario: string;
}

@Component({
  selector: 'app-calificacion-modal',
  templateUrl: './calificacion-modal.component.html',
  styleUrls: ['./calificacion-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CalificacionModalComponent {
  data: CalificacionData;
  calificacion: number = 0;
  comentario: string = '';
  estrellas: number[] = [1, 2, 3, 4, 5];

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    this.data = this.config.data;
  }

  onCalificar(estrella: number): void {
    this.calificacion = estrella;
  }

  onHover(estrella: number): void {
    // Para efecto hover si se necesita
  }

  onLeave(): void {
    // Para efecto hover si se necesita
  }

  onSubmit(): void {
    if (this.calificacion === 0) {
      return;
    }

    const result: CalificacionResult = {
      calificacion: this.calificacion,
      comentario: this.comentario
    };

    this.ref.close(result);
  }

  onCancel(): void {
    this.ref.close();
  }

  getEstrellaClass(estrella: number): string {
    if (estrella <= this.calificacion) {
      return 'pi pi-star-fill';
    }
    return 'pi pi-star';
  }

  getEstrellaColor(estrella: number): string {
    if (estrella <= this.calificacion) {
      return '#fbbf24';
    }
    return '#d1d5db';
  }
}
