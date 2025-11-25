import { Component, OnInit } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { AppMessagesServices } from 'src/app/core/services/toas.service';
import { EstadoTransaccion } from 'src/app/shared/enums/articulo.enums';
import { Gestion } from '../../models/gestion.model';
import { MisGestionesService } from '../../services/mis-gestiones.service';
import { RespuestaMessageComponent } from './respuesta-message/respuesta-message.component';
import { API_ENDPOINTS } from 'src/app/core/constants/api-endpoints';
import { ImageViewerService } from 'src/app/shared/services/image-viewer.service';
import { ImageUrlService } from 'src/app/core/services/image-url.service';
import { UsuarioInfoModalComponent } from 'src/app/shared/components/usuario-info-modal/usuario-info-modal.component';
import { UsuarioInfo } from 'src/app/shared/models/articulo.model';
import { CalificacionModalComponent } from 'src/app/shared/components/calificacion-modal/calificacion-modal.component';

@Component({
  selector: 'app-gestion-detail',
  templateUrl: './gestion-detail.component.html',
  styleUrls: ['./gestion-detail.component.scss'],
})
export class GestionDetailComponent implements OnInit {
  gestion: Gestion | null = null;
  activeTab!: string;
  currentImageIndex: number = 0;
  solicitudId!: number;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private dialogService: DialogService,
    private misGestionesService: MisGestionesService,
    private messageService: AppMessagesServices,
    private imageViewerService: ImageViewerService,
    public imageUrlService: ImageUrlService
  ) {
    this.solicitudId = config?.data?.solicitudId;
    this.activeTab = (config?.data?.activeTab as string) ?? '';
  }

  ngOnInit(): void {
    if (this.solicitudId) {
      this.loadGestionDetails();
    } else {
      this.messageService.error('No se pudo identificar la solicitud');
      this.ref.close();
    }
  }

  private loadGestionDetails(): void {
    this.misGestionesService.getSolicitud(this.solicitudId).subscribe({
      next: (gestion) => {
        this.gestion = gestion;
      },
      error: (err) => {
        console.error('Error loading gestion details:', err);
        this.messageService.error('Error al cargar los detalles de la gestión');
        this.ref.close();
      }
    });
  }

  closeModal(): void {
    this.ref.close();
  }

  nextImage(): void {
    const imagenes = this.gestion?.imagenes || [];
    if (imagenes.length > 1) {
      this.currentImageIndex =
        this.currentImageIndex === imagenes.length - 1
          ? 0
          : this.currentImageIndex + 1;
    }
  }

  previousImage(): void {
    const imagenes = this.gestion?.imagenes || [];
    if (imagenes.length > 1) {
      this.currentImageIndex =
        this.currentImageIndex === 0
          ? imagenes.length - 1
          : this.currentImageIndex - 1;
    }
  }

  goToImage(index: number): void {
    this.currentImageIndex = index;
  }

  openImageViewer(): void {
    const imagenes = this.gestion?.imagenes || [];
    if (imagenes.length > 0) {
      this.imageViewerService.openViewer({
        images: imagenes,
        currentIndex: this.currentImageIndex,
        imageBaseUrl: API_ENDPOINTS.IMAGE_BASE_URL,
      });
    }
  }

  getInitials(): string {
    const persona = this.getPersonaData();
    const nombre = persona.nombre || '';
    // Si el nombre contiene espacios, tomar la primera letra del nombre y del apellido
    const partes = nombre.split(' ');
    if (partes.length >= 2) {
      return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase();
    }
    // Si solo hay una palabra, tomar las primeras dos letras
    return nombre.substring(0, Math.min(2, nombre.length)).toUpperCase();
  }

  getCurrentImage(): string {
    const imagenes = this.gestion?.imagenes || [];
    return imagenes[this.currentImageIndex] || '';
  }

  hasImages(): boolean {
    const imagenes = this.gestion?.imagenes || [];
    return imagenes.length > 0;
  }

  hasMultipleImages(): boolean {
    const imagenes = this.gestion?.imagenes || [];
    return imagenes.length > 1;
  }

  getPersonaTitle(): string {
    switch (this.activeTab) {
      case 'solicitudes-enviadas':
      case 'prestamos-activos':
        return 'Datos del Propietario';
      case 'solicitudes-recibidas':
      case 'prestamos-otorgados':
        return 'Datos del Solicitante';
      default:
        return 'Datos del Solicitante';
    }
  }

  verInfoUsuario(usuario: UsuarioInfo): void {
    if (!usuario) return;

    this.dialogService.open(UsuarioInfoModalComponent, {
      header: 'Información del Usuario',
      width: '500px',
      styleClass: 'p-app-modal',
      data: {
        usuario,
      },
    });
  }

  getPersonaData(): any {
    switch (this.activeTab) {
      case 'solicitudes-enviadas':
      case 'prestamos-activos':
        return this.gestion?.propietario || {};
      case 'solicitudes-recibidas':
      case 'prestamos-otorgados':
        return this.gestion?.solicitante || {};
      default:
        return this.gestion?.solicitante || {};
    }
  }

  getMensajeTitle(): string {
    switch (this.activeTab) {
      case 'solicitudes-enviadas':
        return 'Mensaje de tu solicitud';
      case 'solicitudes-recibidas':
        return 'Mensaje del solicitante';
      case 'prestamos-activos':
      case 'prestamos-otorgados':
        return 'Mensaje de la solicitud';
      default:
        return 'Mensaje del solicitante';
    }
  }

  getMensajeRespuestaTitle(): string {
    switch (this.activeTab) {
      case 'solicitudes-enviadas':
        return 'Respuesta del propietario';
      case 'solicitudes-recibidas':
        return 'Tu respuesta';
      case 'prestamos-activos':
        return 'Respuesta del propietario';
      case 'prestamos-otorgados':
        return 'Tu respuesta';
      default:
        return 'Respuesta';
    }
  }

  private cambiarEstado(
    estadoCodigo: EstadoTransaccion,
    titulo: string,
    icono: string,
    requiereMensaje: boolean = false
  ): void {
    if (requiereMensaje) {
      // Abrir modal para ingresar mensaje
      const ref = this.dialogService.open(RespuestaMessageComponent, {
        header: titulo,
        width: '500px',
        styleClass: 'p-app-modal',
        data: {
          titulo,
          icono,
        },
      });

      ref.onClose.subscribe((result) => {
        if (result) {
          this.ejecutarCambioEstado(estadoCodigo, result.mensajeRespuesta);
        }
      });
    } else {
      // Cambiar estado directamente sin mensaje
      this.ejecutarCambioEstado(estadoCodigo);
    }
  }

  private ejecutarCambioEstado(
    estadoCodigo: EstadoTransaccion,
    mensajeRespuesta?: string | null
  ): void {
    if (!this.gestion?.id) {
      this.messageService.error('No se pudo identificar la solicitud');
      return;
    }

    this.misGestionesService
      .cambiarEstadoSolicitud(
        this.gestion.id,
        estadoCodigo,
        mensajeRespuesta || undefined
      )
      .subscribe({
        next: () => {
          const mensajes: Record<EstadoTransaccion, string> = {
            [EstadoTransaccion.Pendiente]: 'Estado actualizado a Pendiente',
            [EstadoTransaccion.Aceptada]: 'Solicitud aceptada exitosamente',
            [EstadoTransaccion.Rechazada]: 'Solicitud rechazada',
            [EstadoTransaccion.DevolucionPendiente]: 'Devolución pendiente iniciada',
            [EstadoTransaccion.Devuelto]: 'Devolución confirmada exitosamente',
            [EstadoTransaccion.Cancelado]: 'Solicitud cancelada',
          };
          this.messageService.exito(
            mensajes[estadoCodigo] || 'Estado actualizado'
          );
          this.ref.close('success');
        },
      });
  }

  onAcceptRequest(): void {
    this.cambiarEstado(
      EstadoTransaccion.Aceptada,
      'Aceptar Solicitud',
      'pi pi-check-circle',
      false
    );
  }

  onRejectRequest(): void {
    this.cambiarEstado(
      EstadoTransaccion.Rechazada,
      'Rechazar Solicitud',
      'pi pi-times-circle',
      true
    );
  }

  onCancelRequest(): void {
    this.cambiarEstado(
      EstadoTransaccion.Cancelado,
      'Cancelar Solicitud',
      'pi pi-ban',
      true
    );
  }

  onReturnItem(): void {
    this.cambiarEstado(
      EstadoTransaccion.DevolucionPendiente,
      'Devolver Artículo',
      'pi pi-undo',
      false
    );
  }

  onConfirmReturn(): void {
    // Mostrar modal de calificación antes de confirmar la devolución
    const ref = this.dialogService.open(CalificacionModalComponent, {
      header: 'Confirmar Devolución',
      width: '500px',
      styleClass: 'p-app-modal',
      data: {
        usuarioId: this.gestion?.solicitante?.id || 0,
        nombreUsuario: this.getPersonaData().nombre
      },
    });

    // Escuchar cuando se cierra el modal para procesar la calificación
    ref.onClose.subscribe((result) => {
      if (result) {
        // Enviar calificación al servidor
        this.misGestionesService.confirmarDevolucion(
          this.gestion?.id || 0,
          this.gestion?.solicitante?.id || 0,
          result.calificacion,
          result.comentario || ''
        ).subscribe({
          next: (response) => {
            
            // Mostrar mensaje de éxito
            this.messageService.exito('Devolución confirmada correctamente');
            this.ref.close('success');
          },
          error: (error) => {
            console.error('Error al confirmar devolución:', error);
            this.messageService.error('Error al confirmar la devolución');
          }
        });
      }
    });
  }

  onRemindReturn(): void {
    // TODO: Implementar lógica para enviar recordatorio
    this.messageService.info('Recordatorio enviado al solicitante');
    this.ref.close('remind');
  }

  // Métodos de validación para mostrar/ocultar botones según estado
  mostrarBotonesAceptarRechazar(): boolean {
    return this.gestion?.estadoCodigo === EstadoTransaccion.Pendiente;
  }

  mostrarBotonCancelar(): boolean {
    return this.gestion?.estadoCodigo === EstadoTransaccion.Pendiente;
  }

  mostrarBotonDevolver(): boolean {
    return this.gestion?.estadoCodigo === EstadoTransaccion.Aceptada;
  }

  mostrarBotonConfirmarDevolucion(): boolean {
    return this.gestion?.estadoCodigo === EstadoTransaccion.DevolucionPendiente;
  }

  
  getEstadoClass(): string {
    if (!this.gestion?.estadoCodigo) return 'estado-unknown';

    switch (this.gestion.estadoCodigo) {
      case EstadoTransaccion.Pendiente:
        return 'estado-pendiente';
      case EstadoTransaccion.Aceptada:
        return 'estado-aceptada';
      case EstadoTransaccion.Rechazada:
        return 'estado-rechazada';
      case EstadoTransaccion.DevolucionPendiente:
        return 'estado-devolucion-pendiente';
      case EstadoTransaccion.Cancelado:
        return 'estado-cancelada';
      case EstadoTransaccion.Devuelto:
        return 'estado-completada';
      default:
        return 'estado-default';
    }
  }

  getEstadoIcon(): string {
    if (!this.gestion?.estadoCodigo) return 'pi pi-question-circle';

    switch (this.gestion.estadoCodigo) {
      case EstadoTransaccion.Pendiente:
        return 'pi pi-clock';
      case EstadoTransaccion.Aceptada:
        return 'pi pi-check-circle';
      case EstadoTransaccion.Rechazada:
        return 'pi pi-times-circle';
      case EstadoTransaccion.DevolucionPendiente:
        return 'pi pi-spin pi-spinner';
      case EstadoTransaccion.Devuelto:
        return 'pi pi-check';
      case EstadoTransaccion.Cancelado:
        return 'pi pi-ban';
      default:
        return 'pi pi-info-circle';
    }
  }

  getEstadoLabel(): string {
    if (!this.gestion?.estadoNombre) return 'Pendiente';
    
    const estado = this.gestion.estadoNombre.toLowerCase();
    
    // Textos cortos para cada estado
    if (estado.includes('devolucion')) return 'Pendiente por devolución';
    if (estado.includes('acept')) return 'Activa';
    if (estado.includes('rechaz')) return 'Rechazada';
    if (estado.includes('cancel')) return 'Cancelada';
    if (estado.includes('devuelto')) return 'Devuelto';
    
    return this.gestion.estadoNombre;
  }

  formatDate(value?: string | Date): string | undefined {
    if (!value) {
      return undefined;
    }

    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return undefined;
    }

    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
