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
    this.initLegends();
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

  // Datos para gráficas (mock realistas)
  categoriaDistribucion: any[] = [
    { name: 'Herramientas', value: 12 },
    { name: 'Hogar', value: 8 },
    { name: 'Deportes', value: 5 },
    { name: 'Tecnología', value: 7 },
  ];

  transaccionesMensuales: any[] = [
    {
      name: 'Solicitudes',
      series: [
        { name: 'May', value: 5 },
        { name: 'Jun', value: 8 },
        { name: 'Jul', value: 6 },
        { name: 'Ago', value: 9 },
        { name: 'Sep', value: 7 },
        { name: 'Oct', value: 10 },
      ],
    },
    {
      name: 'Préstamos',
      series: [
        { name: 'May', value: 2 },
        { name: 'Jun', value: 4 },
        { name: 'Jul', value: 3 },
        { name: 'Ago', value: 6 },
        { name: 'Sep', value: 5 },
        { name: 'Oct', value: 7 },
      ],
    },
  ];

  topArticulos: any[] = [
    { name: 'Taladro', value: 14 },
    { name: 'Bicicleta', value: 9 },
    { name: 'Silla', value: 7 },
    { name: 'Juego Herramientas', value: 6 },
  ];

  // Apariencia/controles
  colorScheme: any = {
    domain: ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#a78bfa'],
  };
  // Vistas fijas para evitar tamaños "saltando"; puedes ajustar según layout
  viewPie: [number, number] = [520, 300];
  viewLine: [number, number] = [720, 320];
  viewBar: [number, number] = [520, 320];

  // Toggles
  showLegendPie = true;
  showLabelsPie = true;
  gradientPie = false;

  showLegendLine = true;
  showLegendBar = false;

  legendPosition: any = 'right';

  // Labels helpers
  formatPercent(value: number): string {
    return `${value}%`;
  }

  // Tarjetas de insights inferiores
  insights = [
    {
      icon: 'pi pi-percentage',
      title: 'Tasa de aceptación',
      value: '82%',
      hint: 'últimos 30 días',
    },
    {
      icon: 'pi pi-clock',
      title: 'Tiempo medio de respuesta',
      value: '3h 20m',
      hint: 'a solicitudes',
    },
    {
      icon: 'pi pi-box',
      title: 'Artículos publicados (mes)',
      value: '6',
      hint: 'este mes',
    },
    {
      icon: 'pi pi-sync',
      title: 'Devoluciones a tiempo',
      value: '95%',
      hint: 'préstamos',
    },
    {
      icon: 'pi pi-user',
      title: 'Usuarios contactados',
      value: '12',
      hint: 'en la red',
    },
    {
      icon: 'pi pi-wallet',
      title: 'Ahorro estimado',
      value: '$420.000',
      hint: 'respecto a precio de lista',
    },
  ];

  // Segunda línea de insights con otros datos
  insightsExtra = [
    {
      icon: 'pi pi-box',
      title: 'Artículos activos',
      value: '18',
      hint: 'publicados actualmente',
    },
    {
      icon: 'pi pi-check-circle',
      title: 'Intercambios completados',
      value: '21',
      hint: 'últimos 90 días',
    },
    {
      icon: 'pi pi-times-circle',
      title: 'Cancelaciones',
      value: '2',
      hint: 'por no disponibilidad',
    },
    {
      icon: 'pi pi-clock',
      title: 'Tiempo prom. préstamo',
      value: '6 días',
      hint: 'duración media',
    },
    {
      icon: 'pi pi-thumbs-up',
      title: 'Índice de satisfacción',
      value: '4.6/5',
      hint: 'valoraciones recibidas',
    },
    {
      icon: 'pi pi-heart',
      title: 'Artículos en favoritos',
      value: '34',
      hint: 'de otros usuarios',
    },
  ];

  // Nueva sección de gráficas (fila 60/40)
  semanaActividad: any[] = [
    { name: 'Lun', value: 3 },
    { name: 'Mar', value: 4 },
    { name: 'Mié', value: 2 },
    { name: 'Jue', value: 5 },
    { name: 'Vie', value: 6 },
    { name: 'Sáb', value: 4 },
    { name: 'Dom', value: 3 },
  ];

  resumenGestiones: any[] = [
    { name: 'Solicitudes', value: 12 },
    { name: 'Préstamos', value: 7 },
  ];

  // Vistas para la fila 60/40
  viewBarWeek: [number, number] = [780, 280];
  viewPieGestiones: [number, number] = [420, 280];

  // Leyendas personalizadas
  semanaLegend: Array<{ label: string; color: string }> = [];
  resumenLegend: Array<{ label: string; color: string }> = [];

  private buildLegend(
    labels: string[]
  ): Array<{ label: string; color: string }> {
    const palette: string[] = this.colorScheme.domain || [];
    return labels.map((label, idx) => ({
      label,
      color: palette[idx % palette.length],
    }));
  }

  private initLegends(): void {
    this.semanaLegend = this.buildLegend(
      this.semanaActividad.map((s) => s.name)
    );
    this.resumenLegend = this.buildLegend(
      this.resumenGestiones.map((s) => s.name)
    );
  }

  openFilters() {
    this.isOpen = true;
  }

  onFiltersApplied(): void {
    this.estadisticasService.filtrar();
  }
}
