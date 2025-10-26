export interface Gestiones {
  id: number;
  tipo: 'solicitud' | 'prestamo';
  articuloId: number;
  articuloTitulo: string;
  articuloImagen?: string;
  articuloCategoria: string;
  articuloTipo: 'venta' | 'prestamo';
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
  estado:
    | 'pendiente'
    | 'aceptada'
    | 'rechazada'
    | 'cancelada'
    | 'activo'
    | 'devuelto'
    | 'vencido';
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
  solicitud: Gestiones;
  esRecibida: boolean; // true si es una solicitud que recibí, false si es una que envié
}
