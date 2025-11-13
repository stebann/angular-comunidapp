export interface Rol {
  id: number;
  nombre: string;
  descripcion: string;
  createdAt?: string;
}

export interface Permiso {
  id: number;
  nombre: string;
  descripcion: string;
  creadoEn: string;
}

export interface Usuario {
  id: number;
  nombreCompleto: string;
  nombreUsuario: string;
  email: string;
  contrasena: string;
  telefono: string;
  direccion: string;
  avatarUrl: string | null;
  ratingPromedio: number;
  rol: Rol;
  permisos: Permiso[];
  creadoEn: string;
  actualizadoEn?: string | null;
  eliminadoEn?: string | null;
}
