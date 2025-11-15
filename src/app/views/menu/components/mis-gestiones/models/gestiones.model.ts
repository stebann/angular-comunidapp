export interface Gestion {
  id: number;
  nombreArticulo: string;
  imagenesArticulo: string;
  propietarioId: number;
  precio: number;
  tipoCodigo: number;
  fechaSolicitud: string;
  mensaje: string;
  categoriaNombre: string;
  estadoNombre: string;
  solicitante: UsuarioInfo;
}

export interface UsuarioInfo {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  foto: string;
}

