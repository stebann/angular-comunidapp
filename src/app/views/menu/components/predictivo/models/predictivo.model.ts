// Modelos Globales
export interface ModeloExitoVenta {
  nombre: string;
  descripcion: string;
  tasaExitoGeneral: number;
  graficoTipo: string;
  datosGrafico: {
    porCategoria: CategoriaExito[];
    porCondicion: CondicionExito[];
  };
}

export interface CategoriaExito {
  categoriaCodigo: number;
  categoriaNombre: string;
  tasaExito: number;
  cantidadArticulos: number;
  cantidadVendidos: number;
}

export interface CondicionExito {
  condicionCodigo: number;
  condicionNombre: string;
  tasaExito: number;
  cantidadArticulos: number;
  cantidadVendidos: number;
}

export interface ModeloCumplimientoPrestamos {
  nombre: string;
  descripcion: string;
  tasaCumplimiento: number;
  graficoTipo: string;
  datosGrafico: {
    tasaCumplimientoPorcentaje: number;
    tasaRetrasoPorcentaje: number;
    prestamosTotales: number;
    prestamosCumplidos: number;
    prestamosRetrasados: number;
    retrasoPromedioDias: number;
    color: string;
  };
}

export interface ModeloTendenciaCategorias {
  nombre: string;
  descripcion: string;
  graficoTipo: string;
  datosGrafico: {
    categorias: CategoriaTendencia[];
  };
}

export interface CategoriaTendencia {
  categoriaCodigo: number;
  categoriaNombre: string;
  tendencia: string;
  variacionPorcentaje: number;
  datosMensual: DatoMensual[];
}

export interface DatoMensual {
  mes: string;
  tasaVenta: number;
}

export interface ModeloDemandaCondiciones {
  nombre: string;
  descripcion: string;
  graficoTipo: string;
  datosGrafico: {
    condiciones: CondicionDemanda[];
  };
}

export interface CondicionDemanda {
  condicionCodigo: number;
  condicionNombre: string;
  nivelDemanda: string;
  tasaVenta: number;
  precioPromedio: number;
  diasVentaPromedio: number;
}

// Modelos por Usuario
export interface ModeloConfiabilidad {
  nombre: string;
  descripcion: string;
  usuarioId: number;
  usuarioNombre: string;
  graficoTipo: string;
  datosGrafico: {
    confiabilidadScore: number;
    categoriaConfiabilidad: string;
    percentilComparativo: number;
    descripcionPercentil: string;
    detalles: DetallesConfiabilidad;
    componentesScore: ComponentesScore;
  };
}

export interface DetallesConfiabilidad {
  ratingPromedio: number;
  transaccionesTotales: number;
  transaccionesCompletadas: number;
  tasaCumplimiento: number;
  prestamosATiempo: number;
  transaccionesRetrasadas: number;
  diasAntiguedad: number;
  calificacionesPromedio: number;
  tendencia: string;
}

export interface ComponentesScore {
  ratingContribucion: number;
  transaccionesContribucion: number;
  cumplimientoContribucion: number;
  antiguedadContribucion: number;
  calificacionesContribucion: number;
}

export interface ModeloInactividad {
  nombre: string;
  descripcion: string;
  usuarioId: number;
  usuarioNombre: string;
  graficoTipo: string;
  datosGrafico: {
    prediccion: string;
    confianzaPrediccion: number;
    transaccionesUltimoMes: number;
    diasSinActividad: number;
    articulosActivos: number;
    tendencia30Dias: string;
    sparkLineUltimos30: DatoDia[];
    heatmap12Meses: DatoMes[];
  };
}

export interface DatoDia {
  dia: number;
  actividad: number;
}

export interface DatoMes {
  mes: string;
  actividadPromedio: number;
  intensidad: string;
}

// Modelo completo de respuesta
export interface ModelosPredictivos {
  timestamp: string;
  modelosGlobales: {
    modelo1ExitoVenta: ModeloExitoVenta;
    modelo2CumplimientoPrestamos: ModeloCumplimientoPrestamos;
    modelo3TendenciaCategorias: ModeloTendenciaCategorias;
    modelo4DemandaCondiciones: ModeloDemandaCondiciones;
  };
  modelosUsuario: {
    modelo5ConfiabilidadUsuario: ModeloConfiabilidad;
    modelo6InactividadUsuario: ModeloInactividad;
  };
}
