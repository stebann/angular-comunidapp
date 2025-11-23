export interface DetalleComercio {
  id: number;
  nombre: string;
  descripcion: string;
  direccion: string;
  telefono: string;
  email?: string;
  imagenes: string[];
  sitioWeb?: string;
  tieneEnvio?: boolean;
  categoriaNombre?: string;
  categoriasArticulos: CategoriaArticulo[];
  articulos: ArticuloComercio[];
}

export interface CategoriaArticulo {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface ArticuloComercio {
  id: number;
  titulo: string;
  descripcion: string;
  categoriaCodigo: number;
  condicionCodigo: number;
  tipoTransaccionCodigo: number;
  precio: number;
  imagenes: string[];
  categoriaArticuloComercioNombre: string;
}
