import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppMessagesServices } from 'src/app/core/services/toas.service';
import { ArticuloDetailComponent } from 'src/app/shared/components/articulo-detail/articulo-detail.component';
import { EstadoArticulo } from 'src/app/shared/enums/articulo.enums';
import { FilterOption } from 'src/app/shared/models/filter-models';

import { FiltersService } from 'src/app/shared/services/filters.service';
import { ModalArticuloComponent } from './components/modal-articulo/modal-articulo.component';
import { Articulo } from './models/articulo';
import { MisArticulosService } from './services/mis-articulos.service';

@Component({
  selector: 'app-mis-articulos',
  templateUrl: './mis-articulos.component.html',
  styleUrls: ['./mis-articulos.component.scss'],
})
export class MisArticulosComponent implements OnInit {
  searchTerm: string = '';
  menuItems: any[] = [];
  isOpen: boolean = false;
  categorias: FilterOption[] = [];
  condiciones: FilterOption[] = [];
  tiposTransaccion: FilterOption[] = [];
  articuloSeleccionado: Articulo | null = null;

  constructor(
    public articulosService: MisArticulosService,
    private authService: AuthService,
    private filtersService: FiltersService,
    public dialogService$: DialogService,
    private confirmationService: ConfirmationService,
    private appMessages: AppMessagesServices
  ) {}

  ngOnInit(): void {
    const usuario = this.authService.currentState;
    if (usuario && usuario.id) {
      this.articulosService.getMisArticulos(usuario.id);
    }

    this.filtersService
      .getCategorias()
      .subscribe((categorias) => (this.categorias = categorias));

    this.filtersService
      .getCondiciones()
      .subscribe((condiciones) => (this.condiciones = condiciones));

    this.filtersService
      .getTiposTransaccion()
      .subscribe((tipos) => (this.tiposTransaccion = tipos));

    this.menuItems = [
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        command: () => {
          this.onEdit();
        },
        visible: () =>
          this.articuloSeleccionado?.estadoArticuloCodigo ===
          EstadoArticulo.Disponible,
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        command: () => {
          this.onRemove();
        },
      },
    ];
  }

  get form() {
    return this.articulosService.formEdit;
  }

  get filtro() {
    return this.articulosService.filtroMisArticulos;
  }

  get articulos(): Articulo[] {
    const term = this.searchTerm?.trim().toLowerCase();
    const base = (
      !term
        ? this.articulosService.articulos
        : this.articulosService.articulos.filter(
            (a: Articulo) =>
              a.titulo.toLowerCase().includes(term) ||
              a.descripcion.toLowerCase().includes(term)
          )
    ).slice();
    return base.sort((a: Articulo, b: Articulo) =>
      a.titulo.localeCompare(b.titulo)
    );
  }

  onEdit(): void {
    if (!this.articuloSeleccionado) return;

    this.articulosService
      .obtenerArticuloById(this.articuloSeleccionado.id)
      .subscribe((articulo: any) => {
        this.articulosService.formEdit.patchValue(articulo);
        this.articulosService.formEdit.updateValueAndValidity();
        this.dialogService$.open(ModalArticuloComponent, {
          header: 'Editar Artículo',
          width: '1200px',
          styleClass: 'p-app-modal',
        });
      });
  }

  onRemove(): void {
    // Validar que el artículo esté disponible
    if (
      this.articuloSeleccionado!.estadoArticuloCodigo !==
      EstadoArticulo.Disponible
    ) {
      this.appMessages.advertencia(
        'Solo puedes eliminar artículos que estén disponibles',
        'Acción no permitida'
      );
      return;
    }

    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar el artículo "${
        this.articuloSeleccionado!.titulo
      }"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const usuario = this.authService.currentState;
        this.articulosService
          .eliminar(this.articuloSeleccionado!.id, usuario.id)
          .subscribe(
            () => {
              this.articulosService.getMisArticulos(usuario.id);
              this.articuloSeleccionado = null;
            },
            (error) => {
              console.error('Error al eliminar artículo:', error);
            }
          );
      },
    });
  }

  openFilters() {
    this.isOpen = true;
  }

  onFiltersApplied(): void {}

  openCreateModal(): void {
    this.articulosService.formNew.reset();
    this.articulosService.formEdit.reset();
    this.articulosService.formEdit.patchValue({ id: null });
    this.dialogService$.open(ModalArticuloComponent, {
      header: 'Crear Artículo',
      width: '1200px',
      styleClass: 'p-app-modal',
    });
  }

  abrirModalArticulo(articulo: Articulo): void {
    this.dialogService$.open(ArticuloDetailComponent, {
      header: 'Detalle del Artículo',
      width: '50vw',
      height: 'auto',
      data: { 
        articuloId: articulo.id,
      },
      styleClass: 'p-app-modal',
    });
  }
}
