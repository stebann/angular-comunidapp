import { Component, OnInit } from '@angular/core';
import { EstadisticasService } from './services/estadisticas.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ResumenEstadisticas, RESUMEN_ESTADISTICAS_DEFAULT } from './models/estadisticas.model';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})
export class EstadisticasComponent implements OnInit {
  isOpen: boolean = false;
  resumenData: ResumenEstadisticas = RESUMEN_ESTADISTICAS_DEFAULT;

  constructor(private estadisticasService: EstadisticasService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadEstadisticas();
  }

  loadEstadisticas(): void {
    const usuarioId = this.authService.currentState.id;
    this.estadisticasService.getEstadisticas(usuarioId).subscribe({
      next: (data) => {
        this.resumenData = this.estadisticasService.mapearResumenEstadisticas(data);
      },
      error: (error) => {
        console.error('Error cargando estadísticas:', error);
        // Mantiene valores por defecto si API falla
      }
    });
  }

  get filtro() {
    return this.estadisticasService.filtroEstadisticas;
  }

  openFilters() {
    this.isOpen = true;
  }
}
