import { Injectable } from '@angular/core';

export interface ImageHandlerConfig {
  baseUrl?: string; // URL base para construir URLs de imágenes (ej: 'http://localhost:8080/api/articulo/imagen')
  maxImages?: number; // Máximo de imágenes permitidas
}

@Injectable({
  providedIn: 'root',
})
export class ImageHandlerService {
  /**
   * Convierte un array de nombres de archivo o URLs a URLs completas para preview
   */
  loadImagesForPreview(
    images: string[],
    config: ImageHandlerConfig = {}
  ): string[] {
    if (!images || !Array.isArray(images) || images.length === 0) {
      return [];
    }

    const { baseUrl } = config;

    return images
      .filter((img) => img) // Filtrar nulos/vacíos
      .map((imagen: string) => {
        // Si ya es una URL completa, usarla tal cual
        if (imagen.startsWith('http')) {
          return imagen;
        }
        // Si es un nombre de archivo y hay baseUrl, construir la URL completa
        if (baseUrl) {
          return `${baseUrl}/${imagen}`;
        }
        return imagen;
      });
  }

  /**
   * Convierte Files a base64 para preview
   */
  async filesToBase64(files: File[]): Promise<string[]> {
    const promises = files
      .filter((file) => file.type.startsWith('image/'))
      .map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      );

    return Promise.all(promises);
  }

  /**
   * Extrae nombres de archivo de URLs
   */
  extractFilenameFromUrl(url: string, baseUrl?: string): string {
    if (!url) return '';

    // Si ya es un nombre de archivo (no URL), devolverlo tal cual
    if (!url.startsWith('http')) {
      return url;
    }

    // Si hay baseUrl, extraer el nombre de archivo
    if (baseUrl && url.includes(baseUrl)) {
      return url.split(`${baseUrl}/`)[1] || url;
    }

    // Intentar extraer de cualquier URL
    const parts = url.split('/');
    return parts[parts.length - 1] || url;
  }

  /**
   * Separa imágenes existentes (URLs) de nuevas (base64)
   */
  separateImages(
    previewImages: string[],
    baseUrl?: string
  ): {
    existing: string[]; // Nombres de archivo
    new: string[]; // Base64
  } {
    const existing: string[] = [];
    const newImages: string[] = [];

    previewImages.forEach((img) => {
      if (img.startsWith('http')) {
        // Es una imagen existente, extraer el nombre de archivo
        const filename = this.extractFilenameFromUrl(img, baseUrl);
        if (filename) existing.push(filename);
      } else if (img.startsWith('data:image')) {
        // Es una imagen nueva (base64)
        newImages.push(img);
      }
    });

    return { existing, new: newImages };
  }

  /**
   * Convierte una URL de imagen a File
   */
  async urlToFile(url: string, filename: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  }

  /**
   * Convierte base64 a File
   */
  async base64ToFile(
    base64: string,
    filename: string = 'image.png'
  ): Promise<File> {
    // Extraer el tipo MIME del base64
    const matches = base64.match(/^data:([^;]+);base64,(.+)$/);
    if (!matches) {
      throw new Error('Formato base64 inválido');
    }

    const mimeType = matches[1];
    const base64Data = matches[2];

    // Convertir base64 a blob
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    return new File([blob], filename, { type: mimeType });
  }

  /**
   * Convierte todas las imágenes del preview (URLs y base64) a Files
   */
  async previewImagesToFiles(
    previewImages: string[],
    baseUrl?: string
  ): Promise<File[]> {
    const files: File[] = [];

    for (const img of previewImages) {
      if (img.startsWith('http')) {
        // Es una imagen existente, descargarla y convertirla a File
        const filename =
          this.extractFilenameFromUrl(img, baseUrl) || 'image.png';
        const file = await this.urlToFile(img, filename);
        files.push(file);
      } else if (img.startsWith('data:image')) {
        // Es una imagen nueva (base64), convertirla a File
        const filename = `image_${Date.now()}.png`;
        const file = await this.base64ToFile(img, filename);
        files.push(file);
      }
    }

    return files;
  }
}
