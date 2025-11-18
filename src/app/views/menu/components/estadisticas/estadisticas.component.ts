import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  EstadisticasUsuario,
  RESUMEN_ESTADISTICAS_DEFAULT,
  ResumenEstadisticas,
} from './models/estadisticas.model';
import { EstadisticasService } from './services/estadisticas.service';

Chart.register(...registerables);

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})
export class EstadisticasComponent implements OnInit, AfterViewInit {
  isOpen: boolean = false;
  resumenData: ResumenEstadisticas = RESUMEN_ESTADISTICAS_DEFAULT;
  estadisticasUsuario: EstadisticasUsuario | null = null;
  transaccionesPorEstadoData: any[] = [];
  intercambiosPorTipoData: any[] = [];
  estadosArticulosData: any[] = [];

  @ViewChild('transaccionesChart') transaccionesChart!: ElementRef;
  @ViewChild('intercambiosChart') intercambiosChart!: ElementRef;
  @ViewChild('articulosChart') articulosChart!: ElementRef;

  private transaccionesChartInstance: Chart | null = null;
  private intercambiosChartInstance: Chart | null = null;
  private articulosChartInstance: Chart | null = null;

  constructor(
    private estadisticasService: EstadisticasService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadEstadisticas();
  }

  ngAfterViewInit(): void {
    // Los gráficos se crearán cuando los datos estén disponibles
  }

  loadEstadisticas(): void {
    const usuarioId = this.authService.currentState.id;
    this.estadisticasService.getEstadisticas(usuarioId).subscribe({
      next: (data: EstadisticasUsuario) => {
        this.estadisticasUsuario = data;
        this.resumenData =
          this.estadisticasService.mapearResumenEstadisticas(data);
        this.prepareChartData(data);
        this.createCharts();
      },
      error: (error: any) => {
        console.error('Error al cargar estadísticas:', error);
      },
    });
  }

  prepareChartData(data: EstadisticasUsuario) {
    // Preparar datos para gráfico de barras - Transacciones por Estado
    this.transaccionesPorEstadoData = Object.entries(
      data.transaccionesPorEstado
    ).map(([key, value]) => ({
      name: key,
      value: value || 0,
    }));

    // Preparar datos para gráfico de barras - Intercambios por Tipo
    this.intercambiosPorTipoData = Object.entries(data.intercambiosPorTipo).map(
      ([key, value]) => ({
        name: key,
        value: value || 0,
      })
    );

    // Preparar datos para gráfico de pastel - Estados de Artículos
    this.estadosArticulosData = Object.entries(data.estadosArticulos).map(
      ([key, value]) => ({
        name: key,
        value: value || 0,
      })
    );

    // Asegurar que los gráficos siempre tengan datos para mostrarse
    if (this.transaccionesPorEstadoData.length === 0) {
      this.transaccionesPorEstadoData = [
        { name: 'Completado', value: 0 },
        { name: 'Pendiente', value: 0 },
        { name: 'Cancelado', value: 0 },
      ];
    }

    if (this.intercambiosPorTipoData.length === 0) {
      this.intercambiosPorTipoData = [
        { name: 'Recibidos', value: 0 },
        { name: 'Enviados', value: 0 },
      ];
    }

    // IMPORTANTE: Forzar que Estados Artículos siempre tenga datos aunque sea todo 0
    if (this.estadosArticulosData.length === 0) {
      this.estadosArticulosData = [
        { name: 'Disponible', value: 1 },
        { name: 'Prestado', value: 1 },
      ];
    } else {
      // Si todos los valores son 0, asignar valores mínimos para que el gráfico sea visible
      const totalValue = this.estadosArticulosData.reduce(
        (sum, item) => sum + item.value,
        0
      );
      if (totalValue === 0) {
        this.estadosArticulosData = this.estadosArticulosData.map((item) => ({
          ...item,
          value: 1,
        }));
      }
    }

    console.log('Estados Artículos Data:', this.estadosArticulosData);
    console.log('Intercambios Data:', this.intercambiosPorTipoData);
  }

  createCharts(): void {
    this.createTransaccionesChart();
    this.createIntercambiosChart();
    this.createArticulosChart();
  }

  createTransaccionesChart(): void {
    const ctx = this.transaccionesChart.nativeElement.getContext('2d');

    const config: ChartConfiguration = {
      type: 'bar' as ChartType,
      data: {
        labels: this.transaccionesPorEstadoData.map((d) => d.name),
        datasets: [
          {
            label: 'Transacciones',
            data: this.transaccionesPorEstadoData.map((d) => d.value),
            backgroundColor: [
              'rgba(34, 197, 94, 0.8)',
              'rgba(251, 146, 60, 0.8)',
              'rgba(239, 68, 68, 0.8)',
            ],
            borderColor: [
              'rgba(34, 197, 94, 1)',
              'rgba(251, 146, 60, 1)',
              'rgba(239, 68, 68, 1)',
            ],
            borderWidth: 2,
            borderRadius: 8,
            barThickness: 40,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleFont: {
              size: 14,
              weight: 'bold',
            },
            bodyFont: {
              size: 13,
            },
            cornerRadius: 8,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
            },
            ticks: {
              font: {
                size: 11,
              },
              color: '#666',
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 11,
              },
              color: '#666',
            },
          },
        },
      },
    };

    // Forzar que el gráfico se muestre incluso si todos los valores son 0
    if (this.transaccionesChartInstance) {
      this.transaccionesChartInstance.destroy();
    }
    this.transaccionesChartInstance = new Chart(ctx, config);

    // Asegurar que el gráfico se renderice
    setTimeout(() => {
      if (this.transaccionesChartInstance) {
        this.transaccionesChartInstance.update();
      }
    }, 100);
  }

  createIntercambiosChart(): void {
    const ctx = this.intercambiosChart.nativeElement.getContext('2d');

    const config: ChartConfiguration = {
      type: 'doughnut' as ChartType,
      data: {
        labels: this.intercambiosPorTipoData.map((d) => d.name),
        datasets: [
          {
            data: this.intercambiosPorTipoData.map((d) => d.value),
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(168, 85, 247, 0.8)',
            ],
            borderColor: ['rgba(59, 130, 246, 1)', 'rgba(168, 85, 247, 1)'],
            borderWidth: 2,
            hoverOffset: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              font: {
                size: 11,
              },
              usePointStyle: true,
              pointStyle: 'circle',
            },
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleFont: {
              size: 14,
              weight: 'bold',
            },
            bodyFont: {
              size: 13,
            },
            cornerRadius: 8,
          },
        },
      },
    };

    // Forzar que el gráfico se muestre incluso si todos los valores son 0
    if (this.intercambiosChartInstance) {
      this.intercambiosChartInstance.destroy();
    }
    this.intercambiosChartInstance = new Chart(ctx, config);

    // Asegurar que el gráfico se renderice
    setTimeout(() => {
      if (this.intercambiosChartInstance) {
        this.intercambiosChartInstance.update();
      }
    }, 100);
  }

  createArticulosChart(): void {
    const ctx = this.articulosChart.nativeElement.getContext('2d');

    const config: ChartConfiguration = {
      type: 'doughnut' as ChartType,
      data: {
        labels: this.estadosArticulosData.map((d) => d.name),
        datasets: [
          {
            data: this.estadosArticulosData.map((d) => d.value),
            backgroundColor: [
              'rgba(34, 197, 94, 0.8)',
              'rgba(251, 146, 60, 0.8)',
            ],
            borderColor: ['rgba(34, 197, 94, 1)', 'rgba(251, 146, 60, 1)'],
            borderWidth: 2,
            hoverOffset: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              font: {
                size: 11,
              },
              usePointStyle: true,
              pointStyle: 'circle',
            },
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleFont: {
              size: 14,
              weight: 'bold',
            },
            bodyFont: {
              size: 13,
            },
            cornerRadius: 8,
          },
        },
      },
    };

    // Forzar que el gráfico se muestre incluso si todos los valores son 0
    if (this.articulosChartInstance) {
      this.articulosChartInstance.destroy();
    }
    this.articulosChartInstance = new Chart(ctx, config);

    // Asegurar que el gráfico se renderice
    setTimeout(() => {
      if (this.articulosChartInstance) {
        this.articulosChartInstance.update();
      }
    }, 100);
  }

  get filtro() {
    return this.estadisticasService.filtroEstadisticas;
  }

  openFilters() {
    this.isOpen = true;
  }

  ngOnDestroy(): void {
    // Limpiar gráficos al destruir el componente
    if (this.transaccionesChartInstance) {
      this.transaccionesChartInstance.destroy();
    }
    if (this.intercambiosChartInstance) {
      this.intercambiosChartInstance.destroy();
    }
    if (this.articulosChartInstance) {
      this.articulosChartInstance.destroy();
    }
  }
}
