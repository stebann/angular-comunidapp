import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ImageUrlService {
  /**
   * Construye la URL completa para una imagen
   * @param imagen - Nombre del archivo de imagen o URL completa
   * @returns URL completa de la imagen
   */
  getImagenSrc(imagen: string): string {
    if (!imagen) {
      return this.getPlaceholderImage();
    }

    // Si ya es una URL completa (Cloudinary), retornarla tal cual
    if (imagen.startsWith('http')) {
      return imagen;
    }

    // Si no es una URL completa, es un dato viejo o inválido
    // Usar placeholder en lugar de construir URL local
    console.warn('Imagen local detectada, usando placeholder:', imagen);
    return this.getPlaceholderImage();
  }

  /**
   * Obtiene la primera imagen de un array de imágenes
   * @param imagenes - Array de nombres de imágenes o URLs
   * @returns URL completa de la primera imagen o placeholder
   */
  getImagenFromArray(imagenes: string[]): string {
    if (imagenes && imagenes.length > 0) {
      return this.getImagenSrc(imagenes[0]);
    }
    return this.getPlaceholderImage();
  }

  /**
   * Retorna una imagen placeholder
   */
  private getPlaceholderImage(): string {
    return 'https://images.unsplash.com/photo-1529634896911-85f831d1b31a?auto=format&fit=crop&w=640&h=420&q=70';
  }
}
