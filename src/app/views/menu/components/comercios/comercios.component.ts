import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Comercio {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  ubicacion: string;
  telefono: string;
  imagen: string;
  horario?: string;
}

@Component({
  selector: 'app-comercios',
  templateUrl: './comercios.component.html',
  styleUrls: ['./comercios.component.scss'],
})
export class ComerciosComponent {
  searchTerm: string = '';
  soloFavoritos: boolean = false;
  favoritos: number[] = [];

  constructor(private router: Router) {}

  comercios: Comercio[] = [
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

  trackByFn(index: number, comercio: Comercio): number {
    return comercio.id;
  }

  get comerciosFiltrados(): Comercio[] {
    let lista = this.comercios;

    // Filtrar por favoritos si está activo
    if (this.soloFavoritos) {
      lista = lista.filter((c) => this.favoritos.includes(c.id));
    }

    return lista;
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

  openFilters(): void {
    console.log('Abrir filtros');
  }
}
