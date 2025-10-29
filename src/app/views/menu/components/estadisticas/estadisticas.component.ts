import { Component, OnInit } from '@angular/core';
import { EstadisticasService } from './services/estadisticas.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})
export class EstadisticasComponent implements OnInit {
  isOpen: boolean = false;

  constructor(private estadisticasService: EstadisticasService) {}

  ngOnInit(): void {
    this.estadisticasService.filtrar();
  }

  get filtro() {
    return this.estadisticasService.filtroEstadisticas;
  }

  resumenData = {
    recursos: { valor: 12, titulo: 'Mis Recursos' },
    intercambios: { valor: 28, titulo: 'Intercambios' },
    favoritos: { valor: 34, titulo: 'Favoritos' },
    reputacion: { valor: 4.8, titulo: 'Mi Reputación' },
  };

  openFilters() {
    this.isOpen = true;
  }

  onFiltersApplied(): void {
    this.estadisticasService.filtrar();
  }
}
