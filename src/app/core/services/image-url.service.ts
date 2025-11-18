import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../constants/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class ImageUrlService {
  /**
   * Construye la URL completa para una imagen
   * @param imagen - Nombre del archivo de imagen
   * @returns URL completa de la imagen
   */
  getImagenSrc(imagen: string): string {
    return `${API_ENDPOINTS.IMAGE_BASE_URL}/${imagen}`;
  }
}
