export interface Solicitud {
  id: number;
  articuloId: number;
  articuloTitulo: string;
  articuloImagen?: string;
  articuloCategoria: string;
  articuloTipo: 'venta' | 'prestamo' | 'intercambio';
  articuloPrecio?: number;

  // Información del usuario que hace la solicitud
  usuarioSolicitante: {
    id: number;
    nombre: string;
    iniciales: string;
    avatar?: string;
  };

  // Información del usuario propietario del artículo
  usuarioPropietario: {
    id: number;
    nombre: string;
    iniciales: string;
    avatar?: string;
  };

  // Detalles de la solicitud
  mensaje: string;
  tipoSolicitud: 'venta' | 'prestamo' | 'intercambio';
  estado: 'pendiente' | 'aceptada' | 'rechazada' | 'cancelada';
  fechaCreacion: Date;
  fechaActualizacion?: Date;

  // Información adicional según el tipo
  motivoRechazo?: string;
  fechaLimite?: Date; // Para préstamos
  articuloIntercambio?: {
    id: number;
    titulo: string;
    imagen?: string;
  };
}

export interface SolicitudCardData {
  solicitud: Solicitud;
  esRecibida: boolean; // true si es una solicitud que recibí, false si es una que envié
}
