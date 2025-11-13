import { MenuDTO } from 'src/app/core/models/menu.model';

export interface IAuthUser {
  id: number;
  nombreCompleto: string;
  email: string;
  telefono: string;
  direccion: string;
  avatarUrl: string | null;
  ratingPromedio: number;
  rol: string;
  menus: MenuDTO[];
  permisos: string[];
}
