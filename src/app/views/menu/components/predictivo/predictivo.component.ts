import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModelosPredictivos } from './models/predictivo.model';
import { PredictivoService } from './services/predictivo.service';

Chart.register(...registerables);

@Component({
  selector: 'app-predictivo',
  templateUrl: './predictivo.component.html',
  styleUrls: ['./predictivo.component.scss'],
})
export class PredictivoComponent implements OnInit, OnDestroy {
  modelosPredictivos: ModelosPredictivos | null = null;
  Math = Math;
  userInfo = this.authService.currentState;

  // ViewChilds para gráficos Chart.js
  @ViewChild('tendenciaChart') tendenciaChart!: ElementRef;
  @ViewChild('radarChart') radarChart!: ElementRef;
  @ViewChild('gaugeCanvas') gaugeCanvas!: ElementRef;
  @ViewChild('sparklineCanvas') sparklineCanvas!: ElementRef;

  private tendenciaChartInstance: Chart | null = null;
  private radarChartInstance: Chart | null = null;

  constructor(
    private predictivoService: PredictivoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  ngOnDestroy(): void {
    if (this.tendenciaChartInstance) {
      this.tendenciaChartInstance.destroy();
    }
    if (this.radarChartInstance) {
      this.radarChartInstance.destroy();
    }
  }

  get userInitials(): string {
    const name = this.userInfo?.nombre?.trim();
    if (!name) {
      return 'US';
    }
    const parts = name.split(' ').filter(Boolean);
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase();
  }

  formatUserName(name: string | undefined): string {
    if (!name) return 'Usuario';
    return name
      .trim()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  loadDashboard(): void {
    const usuarioId = this.authService.currentState.id;

    this.predictivoService.getDashboardCompleto(usuarioId).subscribe({
      next: (data: ModelosPredictivos) => {
        this.modelosPredictivos = this.roundNumbers(data);

        setTimeout(() => {
          this.createCharts();
        }, 100);
      },
      error: (error: any) => {
        console.error('Error al cargar dashboard predictivo:', error);
      },
    });
  }

  private roundNumbers(obj: any): any {
    if (obj === null || obj === undefined) return obj;

    if (typeof obj === 'number') {
      // Redondear a 2 decimales
      return Math.round(obj * 100) / 100;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.roundNumbers(item));
    }

    if (typeof obj === 'object') {
      const rounded: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          rounded[key] = this.roundNumbers(obj[key]);
        }
      }
      return rounded;
    }

    return obj;
  }

  createCharts(): void {
    if (!this.modelosPredictivos) return;

    this.createTendenciaChart();
    this.createRadarChart();
    this.createGaugeChart();
    this.createSparklineChart();
  }

  createTendenciaChart(): void {
    if (!this.modelosPredictivos?.modelosGlobales.modelo3TendenciaCategorias) {
      return;
    }

    const modelo =
      this.modelosPredictivos.modelosGlobales.modelo3TendenciaCategorias;
    const categorias = modelo.datosGrafico.categorias;

    if (categorias.length === 0) return;

    const ctx = this.tendenciaChart.nativeElement.getContext('2d');

    // Preparar datos para múltiples series
    const meses = categorias[0]?.datosMensual.map((d) => d.mes) || [];
    const datasets = categorias.map((cat, index) => {
      const colors = [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 101, 101, 0.8)',
        'rgba(251, 191, 36, 0.8)',
        'rgba(139, 92, 246, 0.8)',
      ];
      return {
        label: cat.categoriaNombre,
        data: cat.datosMensual.map((d) => d.tasaVenta),
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length].replace('0.8', '0.1'),
        tension: 0.4,
        fill: false,
      };
    });

    const config: ChartConfiguration = {
      type: 'line' as ChartType,
      data: {
        labels: meses,
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              padding: 15,
              font: {
                size: 13,
                weight: 'bold',
              },
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
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Tasa de Venta (%)',
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Mes',
            },
            grid: {
              display: false,
            },
          },
        },
      },
    };

    if (this.tendenciaChartInstance) {
      this.tendenciaChartInstance.destroy();
    }
    this.tendenciaChartInstance = new Chart(ctx, config);
  }

  createRadarChart(): void {
    if (!this.modelosPredictivos?.modelosGlobales.modelo4DemandaCondiciones) {
      return;
    }

    const modelo =
      this.modelosPredictivos.modelosGlobales.modelo4DemandaCondiciones;
    const condiciones = modelo.datosGrafico.condiciones;

    if (condiciones.length === 0) return;

    const ctx = this.radarChart.nativeElement.getContext('2d');

    // Normalizar datos para el radar (0-100)
    const maxTasaVenta = Math.max(...condiciones.map((c) => c.tasaVenta));
    const maxPrecio = Math.max(...condiciones.map((c) => c.precioPromedio));
    const maxDias = Math.max(...condiciones.map((c) => c.diasVentaPromedio));

    const datasets = condiciones.map((cond, index) => {
      const colors = [
        'rgba(59, 130, 246, 0.6)',
        'rgba(16, 185, 129, 0.6)',
        'rgba(245, 101, 101, 0.6)',
        'rgba(251, 191, 36, 0.6)',
        'rgba(139, 92, 246, 0.6)',
      ];
      return {
        label: cond.condicionNombre,
        data: [
          (cond.tasaVenta / maxTasaVenta) * 100,
          (cond.precioPromedio / maxPrecio) * 100,
          (cond.diasVentaPromedio / maxDias) * 100,
        ],
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length].replace('0.6', '0.2'),
        borderWidth: 2,
      };
    });

    const config: ChartConfiguration = {
      type: 'radar' as ChartType,
      data: {
        labels: ['Tasa de Venta', 'Precio Promedio', 'Días Promedio'],
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              padding: 15,
              font: {
                size: 13,
                weight: 'bold',
              },
            },
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            callbacks: {
              label: (context) => {
                const index = context.dataIndex;
                const cond = condiciones[context.datasetIndex];
                const labels = [
                  `Tasa: ${cond.tasaVenta.toFixed(1)}%`,
                  `Precio: $${cond.precioPromedio.toLocaleString()}`,
                  `Días: ${cond.diasVentaPromedio.toFixed(1)}`,
                ];
                return labels[index];
              },
            },
          },
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
            },
          },
        },
      },
    };

    if (this.radarChartInstance) {
      this.radarChartInstance.destroy();
    }
    this.radarChartInstance = new Chart(ctx, config);
  }

  getTendenciaColor(tendencia: string): string {
    switch (tendencia.toUpperCase()) {
      case 'ALCISTA':
        return '#22c55e';
      case 'BAJISTA':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  }

  getTendenciaIcon(tendencia: string): string {
    switch (tendencia.toUpperCase()) {
      case 'ALCISTA':
        return 'fas fa-arrow-up';
      case 'BAJISTA':
        return 'fas fa-arrow-down';
      default:
        return 'fas fa-minus';
    }
  }

  getIntensidadColor(intensidad: string): string {
    switch (intensidad.toLowerCase()) {
      case 'alta':
        return '#22c55e';
      case 'media':
        return '#f59e0b';
      case 'baja':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  }

  getFunnelColor(index: number): string {
    const colors = [
      'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
    ];
    return colors[index % colors.length];
  }

  getHeatmapColor(intensidad: string): string {
    switch (intensidad.toLowerCase()) {
      case 'alta':
        return '#22c55e';
      case 'media':
        return '#f59e0b';
      case 'baja':
        return '#ef4444';
      default:
        return '#e5e7eb';
    }
  }

  createGaugeChart(): void {
    if (
      !this.modelosPredictivos?.modelosGlobales.modelo2CumplimientoPrestamos
    ) {
      return;
    }

    const modelo =
      this.modelosPredictivos.modelosGlobales.modelo2CumplimientoPrestamos;
    const porcentaje = modelo.datosGrafico.tasaCumplimientoPorcentaje;

    if (!this.gaugeCanvas) return;

    const canvas = this.gaugeCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    // Ajustar tamaño del canvas
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    // Limpiar canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Dibujar arco de fondo
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 0, false);
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 30;
    ctx.stroke();

    // Dibujar arco de progreso
    const angle = (porcentaje / 100) * Math.PI;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, Math.PI - angle, true);
    ctx.strokeStyle = modelo.datosGrafico.color || '#22c55e';
    ctx.lineWidth = 30;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  createSparklineChart(): void {
    if (!this.modelosPredictivos?.modelosUsuario.modelo6InactividadUsuario) {
      return;
    }

    const modelo =
      this.modelosPredictivos.modelosUsuario.modelo6InactividadUsuario;
    const datos = modelo.datosGrafico.sparkLineUltimos30;

    if (!this.sparklineCanvas || datos.length === 0) return;

    const canvas = this.sparklineCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    // Ajustar tamaño del canvas
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = 20;

    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);

    // Calcular valores máximos
    const maxActividad = Math.max(...datos.map((d) => d.actividad), 1);
    const stepX = (width - padding * 2) / (datos.length - 1);
    const stepY = (height - padding * 2) / maxActividad;

    // Dibujar línea
    ctx.beginPath();
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.moveTo(padding, height - padding - datos[0].actividad * stepY);

    datos.forEach((dato, index) => {
      const x = padding + index * stepX;
      const y = height - padding - dato.actividad * stepY;
      ctx.lineTo(x, y);
    });

    ctx.stroke();

    // Dibujar puntos
    ctx.fillStyle = '#3b82f6';
    datos.forEach((dato, index) => {
      const x = padding + index * stepX;
      const y = height - padding - dato.actividad * stepY;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}
