export interface MenuDTO {
  id: number;
  nombre: string;
  ruta: string;
  icono: string;
  orden: number;
  porDefecto?: boolean;
  hijos?: MenuDTO[];
}

export interface MenuItem extends MenuDTO {
  active?: boolean;
  expanded?: boolean;
  children?: MenuItem[];
}
