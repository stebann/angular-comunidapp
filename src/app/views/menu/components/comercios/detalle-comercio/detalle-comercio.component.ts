import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ImageUrlService } from 'src/app/core/services/image-url.service';
import { HttpClient } from '@angular/common/http';
import { ConfirmModalService } from 'src/app/core/services/confirm-modal.service';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private comercioService: ComercioService,
    private imageUrlService: ImageUrlService,
    private dialogService: DialogService,
    private confirmModalService: ConfirmModalService,
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

    this.route.params.subscribe((params) => {
      this.comercioId = +params['id'];
      if (this.comercioId) {
        this.cargarComercio();
      }
    });
  }

  cargarComercio(): void {
    this.comercioService.getComercioPorId(this.comercioId).subscribe(
      (response: DetalleComercio) => {
        this.comercio = response;
        if (
          this.comercio?.categorias &&
          this.comercio.categorias.length > 0
        ) {
          this.categoriaSeleccionada =
            this.comercio.categorias[0].nombre;
        }
      },
      (error) => {
        console.error('Error al cargar el comercio:', error);
        this.router.navigate(['/app/comercios']);
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
    this.router.navigate(['/app/comercios']);
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
    if (!categoria.id) {
      console.error('No se puede eliminar: ID de categoría no válido');
      return;
    }

    this.confirmModalService.confirm({
      message: `¿Estás seguro de que deseas eliminar la categoría "${categoria.nombre}"?`,
      title: 'Confirmar eliminación',
      acceptLabel: 'Eliminar',
      cancelLabel: 'Cancelar',
      icon: 'pi pi-exclamation-triangle'
    }).subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.comercioService.eliminarCategoriaComercio(this.comercioId, categoria.id).subscribe((response) => {

            this.cargarComercio();
          });
      }
    });
  }
}
