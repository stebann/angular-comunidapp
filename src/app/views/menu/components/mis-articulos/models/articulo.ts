export interface Articulo {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  categoria: string;
  tipo: 'prestamo' | 'venta';
  alt: string;
  estado?: string;
  precio?: number;
  fechaCreacion?: Date;
}
