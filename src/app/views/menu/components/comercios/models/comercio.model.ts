export interface Comercio {
  id: number;
  nombre: string;
  descripcion: string;
  direccion: string;
  telefono: string;
  email?: string;
  imagenes: string[];
  horario?: string;
  sitioWeb?: string;
  tieneEnvio?: boolean;
  categoriaNombre?: string;
}
