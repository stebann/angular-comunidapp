import { Component } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})
export class EstadisticasComponent {
  // Datos para el gráfico de tendencias
  tendenciasData = [
    {
      name: 'Intercambios Exitosos',
      series: [
        { name: 'Ene', value: 65 },
        { name: 'Feb', value: 70 },
        { name: 'Mar', value: 75 },
        { name: 'Abr', value: 85 },
        { name: 'May', value: 82 },
        { name: 'Jun', value: 90 },
      ],
    },
    {
      name: 'Nuevos Usuarios',
      series: [
        { name: 'Ene', value: 30 },
        { name: 'Feb', value: 45 },
        { name: 'Mar', value: 55 },
        { name: 'Abr', value: 65 },
        { name: 'May', value: 72 },
        { name: 'Jun', value: 80 },
      ],
    },
  ];
  // Datos para las tarjetas superiores
  resumenData = {
    recursos: { valor: 12, titulo: 'Mis Recursos' },
    intercambios: { valor: 28, titulo: 'Intercambios' },
    favoritos: { valor: 34, titulo: 'Favoritos' },
    reputacion: { valor: 4.8, titulo: 'Mi Reputación' },
  };

  // Datos para el gráfico
  multi = [
    {
      name: 'Mensajes',
      series: [
        { name: 'Lun', value: 5 },
        { name: 'Mar', value: 8 },
        { name: 'Mié', value: 6 },
        { name: 'Jue', value: 12 },
        { name: 'Vie', value: 10 },
        { name: 'Sáb', value: 15 },
        { name: 'Dom', value: 9 },
      ],
    },
    {
      name: 'Solicitudes',
      series: [
        { name: 'Lun', value: 3 },
        { name: 'Mar', value: 4 },
        { name: 'Mié', value: 2 },
        { name: 'Jue', value: 7 },
        { name: 'Vie', value: 5 },
        { name: 'Sáb', value: 8 },
        { name: 'Dom', value: 5 },
      ],
    },
    {
      name: 'Vistas',
      series: [
        { name: 'Lun', value: 12 },
        { name: 'Mar', value: 19 },
        { name: 'Mié', value: 15 },
        { name: 'Jue', value: 25 },
        { name: 'Vie', value: 22 },
        { name: 'Sáb', value: 30 },
        { name: 'Dom', value: 18 },
      ],
    },
  ];

  // Datos para el estado de intercambios
  estadoIntercambios = {
    completados: { valor: 24, total: 32, porcentaje: 75 },
    enProceso: { valor: 6, total: 32, porcentaje: 19 },
    cancelados: { valor: 2, total: 32, porcentaje: 6 },
  };

  // Opciones del gráfico
  view: [number, number] = [700, 300];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Día';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad';
  legendTitle = 'Tipos';
  colorScheme: string = 'cool';
}
