export interface EstadisticasUsuario {
  misRecursos: number;
  intercambios: number;
  intercambiosCompletados: number;
  cancelaciones: number;
  usuariosContactados: number;
  articulosPublicadosMes: number;
  miReputacion: number;
  tasaAceptacion: number;
}

export interface EstadisticaCard {
  valor: number;
  titulo: string;
  icon: string;
}

export const RESUMEN_ESTADISTICAS_DEFAULT: ResumenEstadisticas = {
  misRecursos: { valor: 0, titulo: 'Mis Recursos', icon: 'fas fa-box' },
  intercambios: { valor: 0, titulo: 'Intercambios', icon: 'fas fa-exchange-alt' },
  intercambiosCompletados: { valor: 0, titulo: 'Intercambios Completados', icon: 'fas fa-check-circle' },
  cancelaciones: { valor: 0, titulo: 'Cancelaciones', icon: 'fas fa-times-circle' },
  usuariosContactados: { valor: 0, titulo: 'Usuarios Contactados', icon: 'fas fa-users' },
  articulosPublicadosMes: { valor: 0, titulo: 'Artículos este Mes', icon: 'fas fa-calendar-alt' },
  miReputacion: { valor: 0, titulo: 'Mi Reputación', icon: 'fas fa-star' },
  tasaAceptacion: { valor: 0, titulo: 'Tasa de Aceptación', icon: 'fas fa-percentage' },
};

export interface ResumenEstadisticas {
  misRecursos: EstadisticaCard;
  intercambios: EstadisticaCard;
  intercambiosCompletados: EstadisticaCard;
  cancelaciones: EstadisticaCard;
  usuariosContactados: EstadisticaCard;
  articulosPublicadosMes: EstadisticaCard;
  miReputacion: EstadisticaCard;
  tasaAceptacion: EstadisticaCard;
}
