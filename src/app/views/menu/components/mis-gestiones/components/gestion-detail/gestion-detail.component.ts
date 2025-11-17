import { Component } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { AppMessagesServices } from 'src/app/core/services/toas.service';
import { EstadoTransaccion } from 'src/app/shared/enums/articulo.enums';
import { Gestion } from '../../models/gestiones.model';
import { MisGestionesService } from '../../services/mis-gestiones.service';
import { RespuestaMessageComponent } from './respuesta-message/respuesta-message.component';

type GestionDisplay = {
  referencia: string;
  mensaje: string;
  mensajeRespuesta?: string;
  producto: {
    nombre: string;
    tipo: string;
    categoria: string;
    estado: string;
    condicion: string;
    imagenPrincipal: string;
    imagenes: string[];
  };
  solicitante: {
    rol: string;
    nombre: string;
    apellido: string;
    nombreCompleto: string;
    telefono: string;
    email: string;
    id: string;
  };
  propietario: {
    rol: string;
    nombre: string;
    apellido: string;
    nombreCompleto: string;
    telefono: string;
    email: string;
    id: string;
  };
  cronograma: {
    fechaSolicitud: string;
    devolucionEstimada: string;
  };
};

@Component({
  selector: 'app-gestion-detail',
  templateUrl: './gestion-detail.component.html',
  styleUrls: ['./gestion-detail.component.scss'],
})
export class GestionDetailComponent {
  gestion!: Gestion;
  activeTab!: string;
  displayData!: GestionDisplay;
  currentImageIndex: number = 0;
  detalleDemo: GestionDisplay = {
    referencia: 'USR-2847',
    mensaje:
      'Necesito el taladro para un proyecto de renovación del hogar este fin de semana.',
    producto: {
      nombre: 'Taladro eléctrico profesional',
      tipo: 'Herramientas',
      categoria: 'Herramientas',
      estado: 'Pendiente',
      condicion: 'Como nuevo',
      imagenPrincipal:
        'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=900&q=80',
      imagenes: [
        'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80',
      ],
    },
    solicitante: {
      rol: 'Solicitante',
      nombre: 'Carlos',
      apellido: 'Mendoza',
      nombreCompleto: 'Carlos Mendoza Rivera',
      telefono: '+34 655 123 456',
      email: 'carlos.mendoza@email.com',
      id: 'USR-2847',
    },
    propietario: {
      rol: 'Propietario',
      nombre: 'María',
      apellido: 'García',
      nombreCompleto: 'María García López',
      telefono: '+34 612 345 678',
      email: 'maria.garcia@email.com',
      id: 'USR-1234',
    },
    cronograma: {
      fechaSolicitud: '16/11/2025',
      devolucionEstimada: '21/11/2025',
    },
  };

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private dialogService: DialogService,
    private misGestionesService: MisGestionesService,
    private messageService: AppMessagesServices
  ) {
    this.gestion = (config?.data?.gestion as Gestion) ?? ({} as Gestion);
    this.activeTab = (config?.data?.activeTab as string) ?? '';
    this.displayData = this.mapGestionToDisplay();
  }

  closeModal(): void {
    this.ref.close();
  }

  nextImage(): void {
    if (this.displayData.producto.imagenes.length > 1) {
      this.currentImageIndex =
        this.currentImageIndex === this.displayData.producto.imagenes.length - 1
          ? 0
          : this.currentImageIndex + 1;
    }
  }

  previousImage(): void {
    if (this.displayData.producto.imagenes.length > 1) {
      this.currentImageIndex =
        this.currentImageIndex === 0
          ? this.displayData.producto.imagenes.length - 1
          : this.currentImageIndex - 1;
    }
  }

  goToImage(index: number): void {
    this.currentImageIndex = index;
  }

  getCurrentImage(): string {
    return (
      this.displayData.producto.imagenes[this.currentImageIndex] ||
      this.displayData.producto.imagenPrincipal
    );
  }

  getInitials(): string {
    const persona = this.getPersonaData();
    const nombre = persona.nombre || '';
    const apellido = persona.apellido || '';
    return (nombre.charAt(0) + apellido.charAt(0)).toUpperCase();
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

  getPersonaData() {
    switch (this.activeTab) {
      case 'solicitudes-enviadas':
      case 'prestamos-activos':
        return this.displayData.propietario;
      case 'solicitudes-recibidas':
      case 'prestamos-otorgados':
        return this.displayData.solicitante;
      default:
        return this.displayData.solicitante;
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
            [EstadoTransaccion.Devuelto]: 'Devolución confirmada exitosamente',
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
      EstadoTransaccion.Rechazada,
      'Cancelar Solicitud',
      'pi pi-ban',
      true
    );
  }

  onReturnItem(): void {
    this.cambiarEstado(
      EstadoTransaccion.Devuelto,
      'Devolver Artículo',
      'pi pi-undo',
      false
    );
  }

  onConfirmReturn(): void {
    this.cambiarEstado(
      EstadoTransaccion.Devuelto,
      'Confirmar Devolución',
      'pi pi-check-circle',
      false
    );
  }

  onRemindReturn(): void {
    // TODO: Implementar lógica para enviar recordatorio
    this.messageService.info('Recordatorio enviado al solicitante');
    this.ref.close('remind');
  }

  getEstadoClass(): string {
    if (!this.gestion?.estadoNombre) return 'estado-unknown';

    const estado = this.gestion.estadoNombre.toLowerCase();

    switch (estado) {
      case 'disponible':
        return 'estado-disponible';
      case 'prestado':
        return 'estado-prestado';
      case 'en mantenimiento':
      case 'mantenimiento':
        return 'estado-mantenimiento';
      case 'solicitado':
        return 'estado-solicitado';
      case 'no disponible':
        return 'estado-no-disponible';
      default:
        return 'estado-default';
    }
  }

  getEstadoIcon(): string {
    if (!this.gestion?.estadoNombre) return 'pi pi-question-circle';

    const estado = this.gestion.estadoNombre.toLowerCase();

    switch (estado) {
      case 'disponible':
        return 'pi pi-check-circle';
      case 'prestado':
        return 'pi pi-arrow-right';
      case 'en mantenimiento':
      case 'mantenimiento':
        return 'pi pi-wrench';
      case 'solicitado':
        return 'pi pi-clock';
      case 'no disponible':
        return 'pi pi-times-circle';
      default:
        return 'pi pi-info-circle';
    }
  }

  private mapGestionToDisplay() {
    const gestionData = this.gestion as any;
    const solicitante = gestionData?.solicitante || {};
    const propietario = gestionData?.propietario || {};
    const imagenPrincipal =
      gestionData?.imagenArticulo || this.detalleDemo.producto.imagenPrincipal;
    const imagenes =
      Array.isArray(gestionData?.imagenes) && gestionData.imagenes.length
        ? gestionData.imagenes
        : [imagenPrincipal, ...this.detalleDemo.producto.imagenes.slice(1)];

    return {
      referencia:
        gestionData?.referencia ||
        gestionData?.codigo ||
        this.detalleDemo.referencia,
      mensaje: gestionData?.mensaje || this.detalleDemo.mensaje,
      mensajeRespuesta: gestionData?.mensajeRespuesta || undefined,
      producto: {
        nombre: gestionData?.nombreArticulo || this.detalleDemo.producto.nombre,
        tipo: gestionData?.tipoNombre || this.detalleDemo.producto.tipo,
        categoria:
          gestionData?.categoriaNombre || this.detalleDemo.producto.categoria,
        estado: gestionData?.estadoNombre || this.detalleDemo.producto.estado,
        condicion:
          gestionData?.condicionArticulo ||
          gestionData?.condicion ||
          gestionData?.estadoCondicion ||
          this.detalleDemo.producto.condicion,
        imagenPrincipal,
        imagenes,
      },
      solicitante: {
        rol: this.detalleDemo.solicitante.rol,
        nombre: solicitante?.nombre || this.detalleDemo.solicitante.nombre,
        apellido:
          solicitante?.apellido || this.detalleDemo.solicitante.apellido,
        nombreCompleto:
          solicitante?.nombreCompleto ||
          [solicitante?.nombre, solicitante?.apellido]
            .filter(Boolean)
            .join(' ')
            .trim() ||
          this.detalleDemo.solicitante.nombreCompleto,
        telefono:
          solicitante?.telefono || this.detalleDemo.solicitante.telefono,
        email: solicitante?.email || this.detalleDemo.solicitante.email,
        id:
          solicitante?.id ||
          solicitante?.codigo ||
          this.detalleDemo.solicitante.id,
      },
      propietario: {
        rol: this.detalleDemo.propietario.rol,
        nombre: propietario?.nombre || this.detalleDemo.propietario.nombre,
        apellido:
          propietario?.apellido || this.detalleDemo.propietario.apellido,
        nombreCompleto:
          propietario?.nombreCompleto ||
          [propietario?.nombre, propietario?.apellido]
            .filter(Boolean)
            .join(' ')
            .trim() ||
          this.detalleDemo.propietario.nombreCompleto,
        telefono:
          propietario?.telefono || this.detalleDemo.propietario.telefono,
        email: propietario?.email || this.detalleDemo.propietario.email,
        id:
          propietario?.id ||
          propietario?.codigo ||
          String(propietario?.propietarioId || this.detalleDemo.propietario.id),
      },
      cronograma: {
        fechaSolicitud:
          this.formatDate(gestionData?.fechaSolicitud) ||
          this.detalleDemo.cronograma.fechaSolicitud,
        devolucionEstimada:
          this.formatDate(gestionData?.fechaEstimadaDevolucion) ||
          this.detalleDemo.cronograma.devolucionEstimada,
      },
    };
  }

  private formatDate(value?: string | Date): string | undefined {
    if (!value) {
      return undefined;
    }

    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return undefined;
    }

    // Formato DD/MM/YYYY como en el mockup
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
