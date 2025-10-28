import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  categoriaSeleccionada: string = 'Todas';

  // Datos de ejemplo de comercios
  private comercios: any[] = [
    {
      id: 1,
      nombre: 'Ferretería Don Pacho',
      descripcion:
        'Todo en materiales de construcción, herramientas y artículos para el hogar. Amplia variedad de productos de calidad para tus proyectos.',
      categoria: 'Ferretería',
      ubicacion: 'Calle Principal #123, Centro',
      telefono: '+57 312 456 7890',
      imagen:
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop',
      horario: 'Lun - Sáb: 8:00 AM - 7:00 PM',
    },
    {
      id: 2,
      nombre: 'Boutique Elegance',
      descripcion:
        'Moda femenina y accesorios de última temporada a precios justos. Vestidos elegantes, calzado y complementos de diseño exclusivo para todas las ocasiones.',
      categoria: 'Moda',
      ubicacion: 'Mall Plaza Local 45',
      telefono: '+57 315 789 1234',
      imagen:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
      horario: 'Lun - Sáb: 10:00 AM - 8:00 PM',
    },
    {
      id: 3,
      nombre: 'Supermercado La Esperanza',
      descripcion:
        'Productos frescos, abarrotes y artículos de primera necesidad. Precios competitivos y atención personalizada todos los días de la semana.',
      categoria: 'Supermercado',
      ubicacion: 'Avenida Libertador Km 5',
      telefono: '+57 310 234 5678',
      imagen:
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop',
      horario: 'Lun - Dom: 7:00 AM - 9:00 PM',
    },
    {
      id: 4,
      nombre: 'Farmacia San Miguel',
      descripcion:
        'Medicinas, productos de cuidado personal y servicios farmacéuticos. Atención con personal capacitado y amplio inventario de medicamentos y productos de salud.',
      categoria: 'Farmacia',
      ubicacion: 'Calle 15 #45-30',
      telefono: '+57 318 567 8901',
      imagen:
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop',
      horario: 'Lun - Dom: 8:00 AM - 10:00 PM',
    },
    {
      id: 5,
      nombre: 'TecnoStore',
      descripcion:
        'Electrónica, smartphones, computadores y accesorios tecnológicos. Garantía oficial, soporte técnico y las mejores marcas del mercado.',
      categoria: 'Tecnología',
      ubicacion: 'Centro Comercial Galerías, Local 12',
      telefono: '+57 314 890 2345',
      imagen:
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop',
      horario: 'Lun - Sáb: 9:00 AM - 8:00 PM',
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.comercioId = +params['id'];
      this.comercio = this.comercios.find((c) => c.id === this.comercioId);

      if (!this.comercio) {
        // Si no se encuentra el comercio, redirigir a la lista
        this.router.navigate(['/app/comercios']);
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

  private categoriasDisponibles: { nombre: string; icono: string }[] = [
    { nombre: 'Herramientas', icono: 'pi pi-wrench' },
    { nombre: 'Materiales', icono: 'pi pi-box' },
    { nombre: 'Pinturas', icono: 'pi pi-palette' },
    { nombre: 'Electricidad', icono: 'pi pi-bolt' },
    { nombre: 'Plomería', icono: 'pi pi-calculator' },
    { nombre: 'Jardinería', icono: 'pi pi-home' },
    { nombre: 'Construcción', icono: 'pi pi-building' },
    { nombre: 'Decoración', icono: 'pi pi-home' },
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
        fechaCreacion: new Date(),
        imagen: '',
      },
      {
        id: 2,
        titulo: 'Caja de clavos',
        descripcion: 'Clavos de construcción de diferentes tamaños.',
        categoria: 'Materiales',
        tipo: 'venta',
        precio: 15000,
        estado: 'disponible',
        fechaCreacion: new Date(),
        imagen: '',
      },
      {
        id: 3,
        titulo: 'Pintura blanca',
        descripcion: 'Galón de pintura blanca premium.',
        categoria: 'Materiales',
        tipo: 'venta',
        precio: 85000,
        estado: 'disponible',
        fechaCreacion: new Date(),
        imagen: '',
      },
      {
        id: 3,
        titulo: 'Pintura blanca',
        descripcion: 'Galón de pintura blanca premium.',
        categoria: 'Materiales',
        tipo: 'venta',
        precio: 85000,
        estado: 'disponible',
        fechaCreacion: new Date(),
        imagen: '',
      },
      {
        id: 3,
        titulo: 'Pintura blanca',
        descripcion: 'Galón de pintura blanca premium.',
        categoria: 'Materiales',
        tipo: 'venta',
        precio: 85000,
        estado: 'disponible',
        fechaCreacion: new Date(),
        imagen: '',
      },
      {
        id: 3,
        titulo: 'Pintura blanca',
        descripcion: 'Galón de pintura blanca premium.',
        categoria: 'Materiales',
        tipo: 'venta',
        precio: 85000,
        estado: 'disponible',
        fechaCreacion: new Date(),
        imagen: '',
      },
      {
        id: 3,
        titulo: 'Pintura blanca',
        descripcion: 'Galón de pintura blanca premium.',
        categoria: 'Materiales',
        tipo: 'venta',
        precio: 85000,
        estado: 'disponible',
        fechaCreacion: new Date(),
        imagen: '',
      },
      {
        id: 3,
        titulo: 'Pintura blanca',
        descripcion: 'Galón de pintura blanca premium.',
        categoria: 'Materiales',
        tipo: 'venta',
        precio: 85000,
        estado: 'disponible',
        fechaCreacion: new Date(),
        imagen: '',
      },
      {
        id: 3,
        titulo: 'Pintura blanca',
        descripcion: 'Galón de pintura blanca premium.',
        categoria: 'Materiales',
        tipo: 'venta',
        precio: 85000,
        estado: 'disponible',
        fechaCreacion: new Date(),
        imagen: '',
      },
    ];
  }

  cerrarDetalle(): void {
    this.router.navigate(['/app/comercios']);
  }

  toggleSoloFavoritosArticulos(): void {
    this.soloFavoritosArticulos = !this.soloFavoritosArticulos;
  }

  openFiltersArticulos(): void {
    console.log('Abrir filtros de artículos');
  }

  abrirModalInfo(): void {
    console.log('Abrir modal con info completa del negocio');
  }

  abrirModalArticulo(articulo: any): void {
    console.log('Abrir detalle de artículo:', articulo);
  }
}
