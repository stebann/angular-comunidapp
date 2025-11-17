import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Gestion } from '../../models/gestiones.model';

type GestionDisplay = {
  referencia: string;
  mensaje: string;
  producto: {
    nombre: string;
    tipo: string;
    categoria: string;
    estado: string;
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
    cronograma: {
      fechaSolicitud: '16/11/2025',
      devolucionEstimada: '21/11/2025',
    },
  };

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
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
    const nombre = this.displayData.solicitante.nombre || '';
    const apellido = this.displayData.solicitante.apellido || '';
    return (nombre.charAt(0) + apellido.charAt(0)).toUpperCase();
  }

  onAcceptRequest(): void {
    console.log('Aceptar solicitud:', this.gestion);
    // TODO: Implementar lógica para aceptar solicitud
    this.ref.close('accept');
  }

  onRejectRequest(): void {
    console.log('Rechazar solicitud:', this.gestion);
    // TODO: Implementar lógica para rechazar solicitud
    this.ref.close('reject');
  }

  onCancelRequest(): void {
    console.log('Cancelar solicitud:', this.gestion);
    // TODO: Implementar lógica para cancelar solicitud
    this.ref.close('cancel');
  }

  onReturnItem(): void {
    console.log('Devolver artículo:', this.gestion);
    // TODO: Implementar lógica para devolver artículo
    this.ref.close('return');
  }

  onConfirmReturn(): void {
    console.log('Confirmar devolución:', this.gestion);
    // TODO: Implementar lógica para confirmar devolución
    this.ref.close('confirm');
  }

  onRemindReturn(): void {
    console.log('Recordar devolución:', this.gestion);
    // TODO: Implementar lógica para enviar recordatorio
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
      producto: {
        nombre: gestionData?.nombreArticulo || this.detalleDemo.producto.nombre,
        tipo: gestionData?.tipoNombre || this.detalleDemo.producto.tipo,
        categoria:
          gestionData?.categoriaNombre || this.detalleDemo.producto.categoria,
        estado: gestionData?.estadoNombre || this.detalleDemo.producto.estado,
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
