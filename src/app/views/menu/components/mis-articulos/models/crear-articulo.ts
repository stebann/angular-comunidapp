export interface CrearArticuloDto {
  titulo: string;
  descripcion: string;
  categoriaId: number;
  estadoId: number;
  tipoTransaccionId: number;
  precio: number;
  imagenes: string[];
  disponible: boolean;
}
