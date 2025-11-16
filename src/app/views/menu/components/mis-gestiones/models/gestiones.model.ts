export interface Gestion {
  id: number;
  nombreArticulo: string;
  imagenArticulo: string;
  propietarioId: number;
  precio: number;
  tipoCodigo: number;
  tipoNombre: string;
  estadoCodigo: number;
  estadoNombre: string;
  fechaSolicitud: string;
  mensaje: string;
  categoriaNombre: string;
  solicitante: UsuarioInfo;
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

