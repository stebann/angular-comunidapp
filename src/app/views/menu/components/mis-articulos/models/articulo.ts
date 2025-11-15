export interface Articulo {
  id: number;
  titulo: string;
  descripcion: string;
  categoriaCodigo: number;
  categoriaNombre: string;
  condicionCodigo: number;
  condicionNombre: string;
  estadoArticuloCodigo: number | null;
  estadoArticuloNombre: string | null;
  tipoTransaccionCodigo: number;
  tipoTransaccionNombre: string;
  precio: number | null;
  imagenes: string[] | null;
  creadoEn: string;
}
