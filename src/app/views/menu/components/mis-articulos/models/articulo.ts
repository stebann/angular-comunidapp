export interface Articulo {
  id: number;
  titulo: string;
  descripcion: string;
  categoriaNombre: string | null;
  estadoNombre: string | null;
  tipoTransaccionNombre: string | null;
  precio: number | null;
  imagenes: string[] | null;
  disponible: boolean;
  creadoEn: string;
  usuarioId?: number;
  usuarioNombre?: string;
  usuarioEmail?: string;
  usuarioTelefono?: string;
}
