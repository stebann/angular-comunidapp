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
  propietario?: {
    nombre: string;
    correo: string;
    telefono: string;
    direccion: string;
  };
  fechaCompra?: string;
  valor?: number;
  prestamo?: {
    fechaPrestamo: string;
    fechaDevolucion: string;
    prestadoA: string;
    notas: string;
  };
}
