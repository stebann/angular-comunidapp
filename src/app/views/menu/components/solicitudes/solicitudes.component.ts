import { Component, OnInit } from '@angular/core';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { SolicitudesService } from './services/solicitudes.service';

interface Solicitud {
  id: number;
  descripcion: string;
  usuarioIniciales?: string;
  titulo?: string;
}

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss'],
})
export class SolicitudesComponent implements OnInit {
  constructor(
    private filterService: FiltersService,
    private solicitudesService: SolicitudesService
  ) {}

  ngOnInit() {}

  searchTerm: string = '';
  activeTab: 'recibidas' | 'enviadas' = 'recibidas';
  solicitudesRecibidas: Solicitud[] = [
    {
      id: 1,
      descripcion: 'Solicitud para tu bicicleta.',
      usuarioIniciales: 'AB',
      titulo: 'Intercambio de bicicleta',
    },
    {
      id: 2,
      descripcion: 'Solicitud para tu libro de Angular.',
      usuarioIniciales: 'CD',
      titulo: 'Préstamo de libro',
    },
  ];
  solicitudesEnviadas: Solicitud[] = [
    {
      id: 3,
      descripcion: 'Solicitud enviada para silla ergonómica.',
      usuarioIniciales: 'EF',
      titulo: 'Intercambio de silla',
    },
  ];

  openFilters() {
    this.filterService.open();
  }

  onFiltersApplied(filteredData: any): void {
    this.solicitudesService.solicitudes = filteredData;
  }
}
