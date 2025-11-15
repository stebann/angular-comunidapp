import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComercioService } from '../services/comercio.service';

@Component({
  selector: 'app-detalle-comercio',
  templateUrl: './detalle-comercio.component.html',
  styleUrls: ['./detalle-comercio.component.scss'],
})
export class DetalleComercioComponent implements OnInit {
  comercio: any = null;
  comercioId: number = 0;
  searchTermArticulos: string = '';
  soloFavoritosArticulos: boolean = false;
  favoritosArticulos: number[] = [];
  isOpen: boolean = false;
  categoriaSeleccionada: string = 'Todas';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private comercioService: ComercioService,
    private cdr: ChangeDetectorRef
  ) {}

  opciones = [
    { label: 'Solicitudes', value: 1 },
    { label: 'Préstamos', value: 2 },
  ];

  // Datos de ejemplo de comercios (alineados con la vista de lista)
  private comercios: any[] = [
    {
      id: 1,
      nombre: 'Ferretería El Tornillo Feliz',
      descripcion: 'Todo en herramientas y materiales para tu hogar.',
      categoria: 'Ferretería',
      ubicacion: 'Calle 123 #45-67',
      telefono: '(1) 555 1234',
      imagen: 'assets/elementor-placeholder-image.png',
      horario: 'Lun - Sáb: 8:00 AM - 6:00 PM',
    },
    {
      id: 2,
      nombre: 'Cafetería Buen Grano',
      descripcion: 'Café artesanal y repostería fresca todos los días.',
      categoria: 'Cafetería',
      ubicacion: 'Av. Central 10-20',
      telefono: '(1) 555 5678',
      imagen: 'assets/elementor-placeholder-image.png',
      horario: 'Todos los días: 7:00 AM - 9:00 PM',
    },
    {
      id: 3,
      nombre: 'BiciFix Taller',
      descripcion: 'Reparación y mantenimiento de bicicletas.',
      categoria: 'Taller',
      ubicacion: 'Cra 7 #80-12',
      telefono: '(1) 555 2468',
      imagen: 'assets/elementor-placeholder-image.png',
      horario: 'Lun - Vie: 9:00 AM - 6:00 PM',
    },
    {
      id: 4,
      nombre: 'Mercadito Verde',
      descripcion: 'Frutas y verduras orgánicas de productores locales.',
      categoria: 'Mercado',
      ubicacion: 'Cll 50 #20-15',
      telefono: '(1) 555 9753',
      imagen: 'assets/elementor-placeholder-image.png',
      horario: 'Mar - Dom: 7:00 AM - 4:00 PM',
    },
  ];

  ngOnInit() {
    // Asignación inmediata por snapshot para evitar parpadeo
    const idSnap = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(idSnap)) {
      this.comercioId = idSnap;
      this.comercio = this.comercios.find((c) => c.id === this.comercioId);
      this.cdr.detectChanges();
    }

    // Suscripción para cambios dinámicos de ruta (por si navegan dentro)
    this.route.params.subscribe((params) => {
      this.comercioId = +params['id'];
      this.comercio = this.comercios.find((c) => c.id === this.comercioId);
      if (!this.comercio) {
        this.router.navigate(['/app/comercios']);
      } else {
        this.cdr.detectChanges();
      }
    });
  }

  get fechaActual(): string {
    return new Date().toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  get filtro() {
    return this.comercioService.filtroComercio;
  }

  onFiltersApplied(): void {
    this.comercioService.filtrar();
  }

  private categoriasDisponibles: { nombre: string; icono: string }[] = [
    { nombre: 'Herramientas', icono: 'pi pi-wrench' },
    { nombre: 'Materiales', icono: 'pi pi-box' },
    { nombre: 'Pinturas', icono: 'pi pi-palette' },
    { nombre: 'Electricidad', icono: 'pi pi-bolt' },
    { nombre: 'Construcción', icono: 'pi pi-building' },
  ];

  get categorias(): { nombre: string; icono: string }[] {
    return this.categoriasDisponibles;
  }

  get articulosFiltrados(): any[] {
    let lista = this.articulos;

    // Filtrar por categoría
    if (this.categoriaSeleccionada !== 'Todas') {
      lista = lista.filter((a) => a.categoria === this.categoriaSeleccionada);
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

  get articulos(): any[] {
    if (!this.comercio) return [];

    return [
      {
        id: 1,
        titulo: 'Martillo profesional',
        descripcion: 'Martillo de acero con mango ergonómico.',
        categoria: 'Herramientas',
        tipo: 'venta',
        precio: 45000,
        estado: 'disponible',
        fechaCreacion: new Date('2025-09-28'),
        imagen: 'assets/elementor-placeholder-image.png',
      },
      {
        id: 2,
        titulo: 'Caja de clavos',
        descripcion: 'Clavos de construcción de diferentes tamaños.',
        categoria: 'Materiales',
        tipo: 'venta',
        precio: 15000,
        estado: 'disponible',
        fechaCreacion: new Date('2025-10-02'),
        imagen: 'assets/elementor-placeholder-image.png',
      },
      {
        id: 3,
        titulo: 'Pintura blanca',
        descripcion: 'Galón de pintura blanca premium.',
        categoria: 'Pinturas',
        tipo: 'venta',
        precio: 85000,
        estado: 'disponible',
        fechaCreacion: new Date('2025-09-18'),
        imagen: 'assets/elementor-placeholder-image.png',
      },
      {
        id: 4,
        titulo: 'Destornillador estrella',
        descripcion: 'Punta magnética, mango antideslizante.',
        categoria: 'Herramientas',
        tipo: 'venta',
        precio: 12000,
        estado: 'disponible',
        fechaCreacion: new Date('2025-09-12'),
        imagen: 'assets/elementor-placeholder-image.png',
      },
      {
        id: 5,
        titulo: 'Guantes de trabajo',
        descripcion: 'Protección resistente para trabajos pesados.',
        categoria: 'Construcción',
        tipo: 'venta',
        precio: 18000,
        estado: 'disponible',
        fechaCreacion: new Date('2025-10-04'),
        imagen: 'assets/elementor-placeholder-image.png',
      },
      {
        id: 6,
        titulo: 'Cinta métrica 5m',
        descripcion: 'Medición precisa con bloqueo automático.',
        categoria: 'Herramientas',
        tipo: 'venta',
        precio: 22000,
        estado: 'disponible',
        fechaCreacion: new Date('2025-09-05'),
        imagen: 'assets/elementor-placeholder-image.png',
      },
      {
        id: 7,
        titulo: 'Brochas para pintar',
        descripcion: 'Set de 3 brochas de cerdas suaves.',
        categoria: 'Pinturas',
        tipo: 'venta',
        precio: 26000,
        estado: 'disponible',
        fechaCreacion: new Date('2025-08-30'),
        imagen: 'assets/elementor-placeholder-image.png',
      },
      {
        id: 8,
        titulo: 'Cable eléctrico 10m',
        descripcion: 'Cable calibre 14 para instalaciones domésticas.',
        categoria: 'Electricidad',
        tipo: 'venta',
        precio: 39000,
        estado: 'disponible',
        fechaCreacion: new Date('2025-09-22'),
        imagen: 'assets/elementor-placeholder-image.png',
      },
      {
        id: 9,
        titulo: 'Llave inglesa',
        descripcion: 'Ajustable 10”, acero carbono.',
        categoria: 'Herramientas',
        tipo: 'venta',
        precio: 38000,
        estado: 'disponible',
        fechaCreacion: new Date('2025-09-08'),
        imagen: 'assets/elementor-placeholder-image.png',
      },
    ];
  }

  cerrarDetalle(): void {
    this.router.navigate(['/app/comercios']);
  }

  toggleSoloFavoritosArticulos(): void {
    this.soloFavoritosArticulos = !this.soloFavoritosArticulos;
  }

  openFilters() {
    this.isOpen = true;
  }

  abrirModalInfo(): void {
    console.log('Abrir modal con info completa del negocio');
  }

  abrirModalArticulo(articulo: any): void {
    console.log('Abrir detalle de artículo:', articulo);
  }
}
