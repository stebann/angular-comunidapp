import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ImageViewerData {
  images: string[];
  currentIndex: number;
  imageBaseUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ImageViewerService {
  private viewerState$ = new BehaviorSubject<{
    isOpen: boolean;
    data: ImageViewerData | null;
  }>({
    isOpen: false,
    data: null,
  });

  get viewerState(): Observable<{
    isOpen: boolean;
    data: ImageViewerData | null;
  }> {
    return this.viewerState$.asObservable();
  }

  openViewer(data: ImageViewerData): void {
    this.viewerState$.next({
      isOpen: true,
      data,
    });
    document.body.style.overflow = 'hidden';
  }

  closeViewer(): void {
    this.viewerState$.next({
      isOpen: false,
      data: null,
    });
    document.body.style.overflow = '';
  }

  setCurrentIndex(index: number): void {
    const currentState = this.viewerState$.value;
    if (currentState.data) {
      this.viewerState$.next({
        ...currentState,
        data: {
          ...currentState.data,
          currentIndex: index,
        },
      });
    }
  }
}
