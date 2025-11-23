import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { ImageUrlService } from 'src/app/core/services/image-url.service';
import { PlanPremiumModalComponent } from 'src/app/shared/components/plan-premium-modal/plan-premium-modal.component';
import { FilterOption } from 'src/app/shared/models/filter-models';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { Comercio } from './models/comercio.model';
import { ComercioService } from './services/comercio.service';

@Component({
  selector: 'app-comercios',
  templateUrl: './comercios.component.html',
  styleUrls: ['./comercios.component.scss'],
})
export class ComerciosComponent implements OnInit {
  searchTerm: string = '';
  isOpen: boolean = false;

  categorias: FilterOption[] = [];
  condiciones: FilterOption[] = [];
  tiposTransaccion: FilterOption[] = [];

  constructor(
    private router: Router,
    public comercioService: ComercioService,
    private filterService: FiltersService,
    public dialogService$: DialogService,
    public authService: AuthService,
    private imageUrlService: ImageUrlService
  ) {}

  ngOnInit(): void {
    this.comercioService.getComercios();

    this.filterService
      .getCategorias()
      .subscribe((categorias) => (this.categorias = categorias));

    this.filterService
      .getCondiciones()
      .subscribe((condiciones) => (this.condiciones = condiciones));

    this.filterService
      .getTiposTransaccion()
      .subscribe((tipos) => (this.tiposTransaccion = tipos));
  }

  get comercios(): Comercio[] {
    return this.comercioService.comercios;
  }

  get filtro() {
    return this.comercioService.filtroComercio;
  }

  trackByFn(index: number, comercio: Comercio): number {
    return comercio.id;
  }

  get comerciosFiltrados(): Comercio[] {
    const term = this.searchTerm?.trim().toLowerCase();
    let lista = !term
      ? this.comercios
      : this.comercios.filter(
          (c) =>
            c.nombre.toLowerCase().includes(term) ||
            c.descripcion.toLowerCase().includes(term) ||
            c.direccion.toLowerCase().includes(term)
        );

    return lista.slice().sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  onFiltersApplied(): void {}

  getImagenSrc(comercio: Comercio): string {
    return this.imageUrlService.getImagenFromArray(comercio?.imagenes);
  }

  abrirDetalleComercio(comercio: Comercio): void {
    this.router.navigate(['/app/comercios/detalle', comercio.id]);
  }

  openFilters() {
    this.isOpen = true;
  }

  openPlanPremiumModal(): void {
    this.dialogService$.open(PlanPremiumModalComponent, {
      header: '',
      width: '500px',
      styleClass: 'p-app-modal',
      modal: true,
    });

  }
}
