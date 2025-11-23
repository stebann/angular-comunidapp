import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmModalService } from 'src/app/core/services/confirm-modal.service';
import { ImageUrlService } from 'src/app/core/services/image-url.service';
import { AppMessagesServices } from 'src/app/core/services/toas.service';
import {
  ArticuloComercio,
  CategoriaArticulo,
  DetalleComercio,
} from '../models/detalle-comercio.model';
import { ComercioService } from '../services/comercio.service';
import { ModalArticuloComercioComponent } from './components/modal-articulo-comercio/modal-articulo-comercio.component';
import { ModalCategoriaComercioComponent } from './components/modal-categoria-comercio/modal-categoria-comercio.component';

@Component({
  selector: 'app-detalle-comercio',
  templateUrl: './detalle-comercio.component.html',
  styleUrls: ['./detalle-comercio.component.scss'],
})
export class DetalleComercioComponent implements OnInit {
  comercio: DetalleComercio | null = null;
  comercioId: number = 0;
  searchTermArticulos: string = '';
  soloFavoritosArticulos: boolean = false;
  favoritosArticulos: number[] = [];
  categoriaSeleccionada: string = 'Todas';
  categoriaSeleccionadaObj: any = null;
  opcionesCategoria: any[] = [];
  opcionesArticulo: any[] = [];
  esDueno: boolean = false;
  menuItems: any[] = [];
  origen: string = 'explorar';
  articuloSeleccionado: ArticuloComercio | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private comercioService: ComercioService,
    private imageUrlService: ImageUrlService,
    private dialogService: DialogService,
    private confirmModalService: ConfirmModalService,
    private toastService: AppMessagesServices
  ) {}

  ngOnInit() {
    this.opcionesCategoria = [
      {
        icon: 'pi pi-pencil',
        label: 'Editar',
        command: () => this.editarCategoria(this.categoriaSeleccionadaObj),
      },
      {
        icon: 'pi pi-trash',
        label: 'Eliminar',
        command: () => this.eliminarCategoria(this.categoriaSeleccionadaObj),
      },
    ];

    this.opcionesArticulo = [
      {
        icon: 'pi pi-pencil',
        label: 'Editar',
        command: () => this.editarArticulo(this.articuloSeleccionado),
      },
      {
        icon: 'pi pi-trash',
        label: 'Eliminar',
        command: () => this.eliminarArticulo(this.articuloSeleccionado),
      },
    ];

    this.route.params.subscribe((params) => {
      this.comercioId = +params['id'];
      if (this.comercioId) {
        this.cargarComercio();
      }
    });

    this.route.queryParams.subscribe((queryParams) => {
      this.esDueno = queryParams['esDueno'] === 'true';
      this.origen = queryParams['origen'] || 'explorar';
    });

    // Inicializar menuItems (se actualizarán dinámicamente cuando se abre el menú)
    this.menuItems = [
      {
        icon: 'pi pi-pencil',
        label: 'Editar',
        command: () => this.editarArticulo(this.articuloSeleccionado),
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        command: () => this.eliminarArticulo(this.articuloSeleccionado),
      },
    ];
  }

  cargarComercio(): void {
    // Guardar la categoría seleccionada actual antes de recargar
    const categoriaAnterior = this.categoriaSeleccionada;

    this.comercioService.getComercioPorId(this.comercioId).subscribe(
      (response: DetalleComercio) => {
        this.comercio = response;

        // Intentar restaurar la categoría seleccionada anterior
        if (categoriaAnterior && categoriaAnterior !== 'Todas') {
          // Verificar si la categoría anterior todavía existe
          const categoriaExiste = this.comercio?.categorias?.some(
            (cat) => cat.nombre === categoriaAnterior
          );

          if (categoriaExiste) {
            // Restaurar la categoría seleccionada anterior
            this.categoriaSeleccionada = categoriaAnterior;
          } else {
            // Si la categoría fue eliminada, seleccionar "Todas" o la primera disponible
            this.categoriaSeleccionada = 'Todas';
          }
        } else {
          // Si no había categoría seleccionada o era "Todas", mantener o establecer "Todas"
          if (
            !this.categoriaSeleccionada ||
            this.categoriaSeleccionada === 'Todas'
          ) {
            this.categoriaSeleccionada = 'Todas';
          } else {
            // Verificar si la categoría actual todavía existe
            const categoriaExiste = this.comercio?.categorias?.some(
              (cat) => cat.nombre === this.categoriaSeleccionada
            );

            if (!categoriaExiste) {
              this.categoriaSeleccionada = 'Todas';
            }
          }
        }
      },
      (error) => {
        console.error('Error al cargar el comercio:', error);
        const origen = this.route.snapshot.queryParams['origen'] || 'explorar';
        if (origen === 'mis-negocios') {
          this.router.navigate(['/app/comercios/mis-comercios']);
        } else {
          this.router.navigate(['/app/comercios/explorar']);
        }
      }
    );
  }

  get categorias(): CategoriaArticulo[] {
    return this.comercio?.categorias || [];
  }

  get articulosFiltrados(): ArticuloComercio[] {
    if (!this.comercio?.articulos) return [];

    let lista = this.comercio.articulos;

    // Filtrar por categoría
    if (this.categoriaSeleccionada !== 'Todas') {
      lista = lista.filter(
        (a) => a.categoriaArticuloComercioNombre === this.categoriaSeleccionada
      );
    }

    // Filtrar por búsqueda
    if (this.searchTermArticulos.trim()) {
      const termino = this.searchTermArticulos.toLowerCase();
      lista = lista.filter(
        (a) =>
          a.titulo.toLowerCase().includes(termino) ||
          a.descripcion.toLowerCase().includes(termino)
      );
    }

    // Filtrar por favoritos si está activo
    if (this.soloFavoritosArticulos) {
      lista = lista.filter((a) => this.favoritosArticulos.includes(a.id));
    }

    return lista;
  }

  seleccionarCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
  }

  get fechaActual(): string {
    return new Date().toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  getImagenSrc(imagenes: string[] | undefined): string {
    return this.imageUrlService.getImagenFromArray(imagenes || []);
  }

  getImagenComercio(): string {
    return this.imageUrlService.getImagenFromArray(
      this.comercio?.imagenes || []
    );
  }

  cerrarDetalle(): void {
    if (this.origen === 'mis-negocios') {
      this.router.navigate(['/app/comercios/mis-comercios']);
    } else {
      this.router.navigate(['/app/comercios/explorar']);
    }
  }

  toggleSoloFavoritosArticulos(): void {
    this.soloFavoritosArticulos = !this.soloFavoritosArticulos;
  }

  abrirModalInfo(): void {
    console.log('Abrir modal con info completa del negocio');
  }

  abrirModalArticulo(articulo: ArticuloComercio): void {
    console.log('Abrir detalle de artículo:', articulo);
  }

  onMenuOpened(articulo: ArticuloComercio): void {
    this.articuloSeleccionado = articulo;
    // Actualizar los menuItems con el artículo seleccionado
    this.menuItems = [
      {
        icon: 'pi pi-pencil',
        label: 'Editar',
        command: () => this.editarArticulo(this.articuloSeleccionado),
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        command: () => this.eliminarArticulo(this.articuloSeleccionado),
      },
    ];
  }

  agregarArticulo(): void {
    const ref = this.dialogService.open(ModalArticuloComercioComponent, {
      header: 'Agregar Artículo',
      width: '1200px',
      styleClass: 'p-app-modal',
      data: {
        comercioId: this.comercioId,
      },
    });

    ref.onClose.subscribe((result) => {
      if (result?.success) {
        this.cargarComercio();
      }
    });
  }

  agregarCategoria(): void {
    const ref = this.dialogService.open(ModalCategoriaComercioComponent, {
      header: 'Agregar Categoría',
      width: '500px',
      styleClass: 'p-app-modal',
      data: {
        comercioId: this.comercioId,
      },
    });

    ref.onClose.subscribe((result) => {
      if (result?.success) {
        this.cargarComercio();
      }
    });
  }

  editarCategoria(categoria: CategoriaArticulo): void {
    console.log('Editando categoría:', categoria);
    const ref = this.dialogService.open(ModalCategoriaComercioComponent, {
      header: 'Editar Categoría',
      width: '500px',
      styleClass: 'p-app-modal',
      data: {
        comercioId: this.comercioId,
        categoria: categoria,
        isEditing: true,
      },
    });

    ref.onClose.subscribe((result) => {
      if (result?.success) {
        this.cargarComercio();
      }
    });
  }

  eliminarCategoria(categoria: CategoriaArticulo): void {
    // Validar si la categoría tiene artículos asociados
    const articulosEnCategoria =
      this.comercio?.articulos?.filter(
        (articulo) =>
          articulo.categoriaArticuloComercioNombre === categoria.nombre
      ) || [];

    if (articulosEnCategoria.length > 0) {
      this.toastService.advertencia(
        `No se puede eliminar la categoría "${categoria.nombre}" porque tiene ${articulosEnCategoria.length} artículo(s) asociado(s). Por favor, elimina o mueve los artículos primero.`,
        'No se puede eliminar'
      );
      return;
    }

    this.confirmModalService
      .confirm({
        message: `¿Estás seguro de que deseas eliminar la categoría "${categoria.nombre}"?`,
        title: 'Confirmar eliminación',
        acceptLabel: 'Eliminar',
        cancelLabel: 'Cancelar',
        icon: 'pi pi-exclamation-triangle',
      })
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.comercioService
            .eliminarCategoriaComercio(this.comercioId, categoria.id)
            .subscribe(() => {
              this.toastService.exito(
                'Categoría eliminada correctamente',
                'Éxito'
              );
              this.cargarComercio();
            });
        }
      });
  }

  editarArticulo(articulo: ArticuloComercio | null): void {
    if (!articulo || !articulo.id) {
      return;
    }

    const ref = this.dialogService.open(ModalArticuloComercioComponent, {
      header: 'Editar Artículo',
      width: '1200px',
      styleClass: 'p-app-modal',
      data: {
        comercioId: this.comercioId,
        articuloId: articulo.id,
        isEditing: true,
      },
    });

    ref.onClose.subscribe((result) => {
      if (result?.success) {
        this.toastService.exito('Artículo actualizado correctamente', 'Éxito');
        this.cargarComercio();
      }
    });
  }

  eliminarArticulo(articulo: ArticuloComercio | null): void {
    this.confirmModalService
      .confirm({
        message: `¿Estás seguro de que deseas eliminar el artículo "${articulo?.titulo}"?`,
        title: 'Confirmar eliminación',
        acceptLabel: 'Eliminar',
        cancelLabel: 'Cancelar',
        icon: 'pi pi-exclamation-triangle',
      })
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.comercioService
            .eliminarArticuloComercio(this.comercioId, articulo?.id || 0)
            .subscribe(() => {
              this.toastService.exito(
                'Artículo eliminado correctamente',
                'Éxito'
              );
              this.cargarComercio();
            });
        }
      });
  }
}
