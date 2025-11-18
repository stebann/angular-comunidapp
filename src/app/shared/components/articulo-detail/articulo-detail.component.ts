import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';
import { ImageUrlService } from '../../../core/services/image-url.service';
import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppMessagesServices } from 'src/app/core/services/toas.service';
import { MisGestionesService } from 'src/app/views/menu/components/mis-gestiones/services/mis-gestiones.service';
import { AuthService } from '../../../core/services/auth.service';
import { Articulo, UsuarioInfo } from '../../models/articulo.model';
import { ImageViewerService } from '../../services/image-viewer.service';
import { ArticuloDetailService } from './services/articulo-detail.service';
import { SolicitudMessageComponent } from './solicitud-articulo-modal/solicitud-message.component';
import { UsuarioInfoModalComponent } from '../usuario-info-modal/usuario-info-modal.component';


@Component({
  selector: 'app-articulo-detail',
  templateUrl: './articulo-detail.component.html',
  styleUrls: ['./articulo-detail.component.scss'],
})
export class ArticuloDetailComponent implements OnInit {
  @Input() articuloId: number | null = null;
  isOwner: boolean = true; 
  articulo?: Articulo;
  currentImageIndex = 0;
  detallesExpanded = true;
  propietarioExpanded = true;
  isLoading: boolean = true; 

  
  constructor(
    public config: DynamicDialogConfig,
    private articuloDetailService: ArticuloDetailService,
    private imageViewerService: ImageViewerService,
    private authService: AuthService,
    public dialogService$: DialogService,
    private misGestionesService: MisGestionesService,
    private messageService: AppMessagesServices,
    public ref: DynamicDialogRef,
    private imageUrlService: ImageUrlService
  ) {}

  get solicitudForm() {
    return this.articuloDetailService.solicitudForm;
  }

  ngOnInit(): void {
    const currentUser = this.authService.currentState;

    if (this.config.data?.articulo) {
      this.articulo = this.config.data.articulo;
      this.isOwner = currentUser?.id === this.articulo?.propietario?.id;
      this.isLoading = false;
    } else if (this.config.data?.articuloId) {
      this.articuloDetailService
        .obtenerArticuloById(this.config.data.articuloId)
        .subscribe((articulo: Articulo) => {
          this.articulo = articulo;
          this.isOwner = currentUser?.id === articulo.propietario?.id;
          this.isLoading = false;
        });
    } else {
      this.isLoading = false;
    }
  }

  getImagenSrc(imagen: string): string {
    return this.imageUrlService.getImagenSrc(imagen);
  }

  toggleDetalles(): void {
    this.detallesExpanded = !this.detallesExpanded;
  }

  togglePropietario(): void {
    this.propietarioExpanded = !this.propietarioExpanded;
  }

  solicitarArticulo(): void {
    this.solicitudForm.reset();

    const ref = this.dialogService$.open(SolicitudMessageComponent, {
      header: 'Solicitud de Artículo',
      width: '500px',
      styleClass: 'p-app-modal',
    });

    ref.onClose.subscribe((formData) => {
      if (formData && this.articulo?.id) {
        this.misGestionesService
          .crearSolicitud(
            this.articulo.id,
            formData.mensaje,
            formData.fechaEstimadaDevolucion
          )
          .subscribe({
            next: () => {
              this.messageService.exito(
                'Solicitud enviada exitosamente',
                'Solicitud creada'
              );
           
              this.solicitudForm.reset();
         
              this.ref.close();
            },
            error: (error) => {
              this.ref.close();
            },
          });
      }
    });
  }

  openImageViewer(): void {
    if (this.articulo?.imagenes && this.articulo.imagenes.length > 0) {
      this.imageViewerService.openViewer({
        images: this.articulo.imagenes,
        currentIndex: this.currentImageIndex,
        imageBaseUrl: API_ENDPOINTS.IMAGE_BASE_URL,
      });
    }
  }

  nextImage(): void {
    if (
      this.articulo?.imagenes &&
      this.currentImageIndex < this.articulo.imagenes.length - 1
    ) {
      this.currentImageIndex++;
    }
  }

  prevImage(): void {
    if (this.articulo?.imagenes && this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  canGoNext(): boolean {
    return (
      !!this.articulo?.imagenes &&
      this.currentImageIndex < this.articulo.imagenes.length - 1
    );
  }

  canGoPrev(): boolean {
    return !!this.articulo?.imagenes && this.currentImageIndex > 0;
  }

  get titulo(): string {
    return this.articulo?.titulo || '';
  }

  get categoriaNombre(): string {
    return this.articulo?.categoriaNombre || '';
  }

  get descripcion(): string {
    return this.articulo?.descripcion || '';
  }

  get propietarioNombre(): string {
    return this.articulo?.propietario?.nombre || '';
  }

  get propietarioEmail(): string {
    return this.articulo?.propietario?.email || '';
  }

  get propietarioTelefono(): string {
    return this.articulo?.propietario?.telefono || '';
  }

  get propietarioDireccion(): string {
    return this.articulo?.propietario?.direccion || '';
  }

  get tieneSolicitante(): boolean {
    return !!this.articulo?.solicitante;
  }

  get solicitanteNombre(): string {
    return this.articulo?.solicitante?.nombre || '';
  }

  get solicitanteEmail(): string {
    return this.articulo?.solicitante?.email || '';
  }

  get solicitanteTelefono(): string {
    return this.articulo?.solicitante?.telefono || '';
  }

  get solicitanteDireccion(): string {
    return this.articulo?.solicitante?.direccion || '';
  }

  isTextTruncated(element: HTMLElement): boolean {
    return element.offsetWidth < element.scrollWidth;
  }

  get estaDisponible(): boolean {
    return this.articulo?.estadoArticuloCodigo === 1 || true;
  }

  getInitials(nombre: string): string {
    if (!nombre) return '';
    const parts = nombre.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0).toUpperCase() +
      parts[parts.length - 1].charAt(0).toUpperCase()
    );
  }

  verInfoUsuario(usuario: UsuarioInfo | undefined, titulo: string): void {
    if (!usuario) return;

    this.dialogService$.open(UsuarioInfoModalComponent, {
    header: 'Información del Usuario',
      width: '500px',
      styleClass: 'p-app-modal',
      data: {
        usuario,
        titulo,
      },
    });
  }
}
