export interface Rol {
  id: number;
  nombre: string;
  descripcion: string;
  createdAt?: string;
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
  creadoEn: string;
  actualizadoEn?: string | null;
  eliminadoEn?: string | null;
}
