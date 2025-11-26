import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/env/environment';

interface SightengineResponse {
  status: string;
  nudity?: {
    sexual_activity?: number;
    sexual_display?: number;
    erotica?: number;
  };
  weapon?: {
    classes?: {
      firearm?: number;
      knife?: number;
    };
  };
  violence?: {
    prob?: number;
  };
  gore?: {
    prob?: number;
  };
  recreational_drug?: {
    prob?: number;
  };
  self_harm?: {
    prob?: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ImageModerationService {
  private readonly SIGHTENGINE_API_URL =
    'https://api.sightengine.com/1.0/check.json';
  private readonly MODELS =
    'nudity-2.1,weapon,recreational_drug,medical,face-age,gore-2.0,text,tobacco,violence,self-harm';

  private readonly API_USER = environment.sightengine.apiUser;
  private readonly API_SECRET = environment.sightengine.apiSecret;

  // Umbrales de detección (0.0 a 1.0)
  private readonly THRESHOLD_NUDITY = 0.5;
  private readonly THRESHOLD_WEAPON = 0.5;
  private readonly THRESHOLD_VIOLENCE = 0.5;
  private readonly THRESHOLD_GORE = 0.5;
  private readonly THRESHOLD_DRUGS = 0.5;
  private readonly THRESHOLD_SELF_HARM = 0.5;

  constructor(private http: HttpClient) {}

  /**
   * Valida si una imagen es apropiada
   * @param imageFile - Archivo de imagen a validar
   * @returns Observable<boolean> - true si es apropiada, false si es inapropiada
   */
  validateImage(imageFile: File): Observable<boolean> {
    if (!imageFile || !imageFile.type.startsWith('image/')) {
      return of(false);
    }

    const formData = new FormData();
    formData.append('media', imageFile);
    formData.append('models', this.MODELS);
    formData.append('api_user', this.API_USER);
    formData.append('api_secret', this.API_SECRET);

    return this.http
      .post<SightengineResponse>(this.SIGHTENGINE_API_URL, formData)
      .pipe(
        map((response) => this.isImageAppropriate(response)),
        catchError((error) => {
          console.error('Error al validar imagen con Sightengine:', error);
          // En caso de error, permitir la imagen (fallback)
          return of(true);
        })
      );
  }

  /**
   * Valida múltiples imágenes
   * @param imageFiles - Array de archivos de imagen
   * @returns Observable<boolean> - true si todas son apropiadas, false si alguna es inapropiada
   */
  validateImages(imageFiles: File[]): Observable<boolean> {
    if (!imageFiles || imageFiles.length === 0) {
      return of(true);
    }

    // Validar todas las imágenes en paralelo
    const validations = imageFiles.map((file) => this.validateImage(file));

    // Combinar resultados: todas deben ser apropiadas
    return new Observable((observer) => {
      let completed = 0;
      let allValid = true;

      validations.forEach((validation$) => {
        validation$.subscribe({
          next: (isValid) => {
            if (!isValid) {
              allValid = false;
            }
            completed++;
            if (completed === validations.length) {
              observer.next(allValid);
              observer.complete();
            }
          },
          error: () => {
            completed++;
            if (completed === validations.length) {
              observer.next(allValid);
              observer.complete();
            }
          },
        });
      });
    });
  }

  /**
   * Determina si una imagen es apropiada basándose en la respuesta de Sightengine
   */
  private isImageAppropriate(response: SightengineResponse): boolean {
    if (response.status !== 'success') {
      return false;
    }

    // Verificar nudidad
    if (response.nudity) {
      const nudityScore =
        response.nudity.sexual_activity ||
        response.nudity.sexual_display ||
        response.nudity.erotica ||
        0;
      if (nudityScore > this.THRESHOLD_NUDITY) {
        return false;
      }
    }

    // Verificar armas
    if (response.weapon?.classes) {
      const weaponScore =
        response.weapon.classes.firearm || response.weapon.classes.knife || 0;
      if (weaponScore > this.THRESHOLD_WEAPON) {
        return false;
      }
    }

    // Verificar violencia
    if (
      response.violence?.prob &&
      response.violence.prob > this.THRESHOLD_VIOLENCE
    ) {
      return false;
    }

    // Verificar gore
    if (response.gore?.prob && response.gore.prob > this.THRESHOLD_GORE) {
      return false;
    }

    // Verificar drogas recreativas
    if (
      response.recreational_drug?.prob &&
      response.recreational_drug.prob > this.THRESHOLD_DRUGS
    ) {
      return false;
    }

    // Verificar autolesión
    if (
      response.self_harm?.prob &&
      response.self_harm.prob > this.THRESHOLD_SELF_HARM
    ) {
      return false;
    }

    return true;
  }
}
