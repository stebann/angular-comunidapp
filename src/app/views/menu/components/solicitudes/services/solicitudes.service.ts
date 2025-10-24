import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable({ providedIn: 'root' })
export class SolicitudesService {
  public solicitudes: any[] = [];

  constructor(private http$: HttpService) {}
}
