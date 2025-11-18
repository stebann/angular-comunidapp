export interface Solicitud {
  id: number;
  nombreArticulo: string;
  imagenArticulo: string;
  propietarioId: number;
  tipoCodigo: number;
  tipoNombre: string;
  fechaSolicitud: string;
  mensaje: string;
  mensajeRespuesta: string;
  categoriaNombre: string;
  estadoCodigo: number;
  estadoNombre: string;
  solicitante: UsuarioInfo;
  propietario: UsuarioInfo;
  precio: number;
  fechaEstimadaDevolucion: string;
}

export interface UsuarioInfo {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  foto: string;
}
