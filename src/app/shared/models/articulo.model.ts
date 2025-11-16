export interface Articulo {
  id: number;
  titulo: string;
  descripcion: string;
  categoriaCodigo: number;
  categoriaNombre: string;
  condicionCodigo: number;
  condicionNombre: string;
  estadoArticuloCodigo: number;
  estadoArticuloNombre: string;
  tipoTransaccionCodigo: number;
  tipoTransaccionNombre: string;
  precio: number;
  imagenes: string[];
  creadoEn: string;
  propietario: UsuarioInfo;
  solicitante?: UsuarioInfo;
}

export interface UsuarioInfo {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  foto?: string;
}
