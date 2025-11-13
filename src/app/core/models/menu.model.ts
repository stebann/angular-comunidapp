export interface MenuDTO {
  id: number;
  nombre: string;
  ruta: string;
  icono: string;
  orden: number;
  porDefecto?: boolean;
}
