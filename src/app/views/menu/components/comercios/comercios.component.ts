import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
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
  soloFavoritos: boolean = false;
  favoritos: number[] = [];
  isOpen: boolean = false;

  categorias: FilterOption[] = [];
  estados: FilterOption[] = [];
  tiposTransaccion: FilterOption[] = [];

  constructor(
    private router: Router,
    public comercioService: ComercioService,
    private filterService: FiltersService,
    private authService: AuthService
  ) {}

  // Lista "quemada" para demo
  private comerciosMock: Comercio[] = [
    {
      id: 1,
      nombre: 'Ferretería El Tornillo Feliz',
      descripcion: 'Todo en herramientas y materiales para tu hogar.',
      categoria: 'Ferretería',
      ubicacion: 'Calle 123 #45-67',
      telefono: '(1) 555 1234',
      imagen:
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=640&h=420&q=80',
      horario: 'Lun - Sáb: 8:00 AM - 6:00 PM',
    },
    {
      id: 2,
      nombre: 'Cafetería Buen Grano',
      descripcion: 'Café artesanal y repostería fresca todos los días.',
      categoria: 'Cafetería',
      ubicacion: 'Av. Central 10-20',
      telefono: '(1) 555 5678',
      imagen:
        'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=640&h=420&q=80',
      horario: 'Todos los días: 7:00 AM - 9:00 PM',
    },
    {
      id: 3,
      nombre: 'BiciFix Taller',
      descripcion: 'Reparación y mantenimiento de bicicletas.',
      categoria: 'Taller',
      ubicacion: 'Cra 7 #80-12',
      telefono: '(1) 555 2468',
      imagen:
        'https://images.unsplash.com/photo-1543269865-4430f94492b9?auto=format&fit=crop&w=640&h=420&q=80',
      horario: 'Lun - Vie: 9:00 AM - 6:00 PM',
    },
    {
      id: 4,
      nombre: 'Mercadito Verde',
      descripcion: 'Frutas y verduras orgánicas de productores locales.',
      categoria: 'Mercado',
      ubicacion: 'Cll 50 #20-15',
      telefono: '(1) 555 9753',
      imagen:
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=640&h=420&q=80',
      horario: 'Mar - Dom: 7:00 AM - 4:00 PM',
    },
  ];

  ngOnInit(): void {
    // Demo: no llamar servicio; usar lista mock

    this.filterService
      .getCategorias()
      .subscribe((categorias) => (this.categorias = categorias));

    this.filterService
      .getEstados()
      .subscribe((estados) => (this.estados = estados));

    this.filterService
      .getTiposTransaccion()
      .subscribe((tipos) => (this.tiposTransaccion = tipos));
  }

  get comercios(): Comercio[] {
    return this.comerciosMock;
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
            c.categoria.toLowerCase().includes(term) ||
            c.ubicacion.toLowerCase().includes(term)
        );

    // Filtrar por favoritos si está activo
    if (this.soloFavoritos) {
      lista = lista.filter((c) => this.favoritos.includes(c.id));
    }

    return lista.slice().sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  onFiltersApplied(): void {
    // Demo: sin lógica adicional por ahora
  }

  toggleFavorito(comercio: Comercio): void {
    const index = this.favoritos.indexOf(comercio.id);
    if (index > -1) {
      this.favoritos.splice(index, 1);
    } else {
      this.favoritos.push(comercio.id);
    }
  }

  esFavorito(id: number): boolean {
    return this.favoritos.includes(id);
  }

  toggleSoloFavoritos(): void {
    this.soloFavoritos = !this.soloFavoritos;
  }

  abrirDetalleComercio(comercio: Comercio): void {
    this.router.navigate(['/app/comercios/detalle', comercio.id]);
  }

  openFilters() {
    this.isOpen = true;
  }
}
