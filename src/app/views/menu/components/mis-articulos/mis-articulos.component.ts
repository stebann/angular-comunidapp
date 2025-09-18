import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FilterState } from '../../../../shared/models/filter-models';
import { FiltersService } from '../../../../shared/services/filters.service';

interface Articulo {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  categoria: string;
  tipo: 'prestamo' | 'venta';
  alt: string;
  estado?: string;
  fechaCreacion?: Date;
}

@Component({
  selector: 'app-mis-articulos',
  templateUrl: './mis-articulos.component.html',
  styleUrls: ['./mis-articulos.component.scss'],
})
export class MisArticulosComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  articulos: Articulo[] = [];
  filteredArticulos: Articulo[] = [];
  searchTerm: string = '';

  filterState: FilterState = {
    isOpen: false,
    filters: {},
    hasActiveFilters: false,
  };

  constructor(private filtersService: FiltersService) {}

  ngOnInit(): void {
    // Suscribirse a los cambios del estado del filtro
    this.filtersService
      .getFilterState()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.filterState = state;
        this.applyFilters();
      });
    this.articulos = [
      {
        id: 1,
        titulo: 'MacBook Pro 13"',
        descripcion:
          'Laptop en excelente estado, ideal para trabajo y estudio. Incluye cargador original y funda protectora. Perfecto para desarrolladores y diseñadores...',
        imagen:
          'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=200&fit=crop',
        categoria: 'Tecnología',
        tipo: 'prestamo',
        alt: 'Laptop MacBook',
        estado: 'Disponible',
        fechaCreacion: new Date('2024-01-15'),
      },
      {
        id: 2,
        titulo: 'Clean Code - Robert Martin',
        descripcion:
          'Libro clásico de programación en perfecto estado. Contiene técnicas y principios fundamentales para escribir código limpio y mantenible...',
        imagen:
          'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=200&fit=crop',
        categoria: 'Libros',
        tipo: 'venta',
        alt: 'Libro',
        estado: 'Disponible',
        fechaCreacion: new Date('2024-01-20'),
      },
      {
        id: 3,
        titulo: 'Bicicleta Mountain Bike',
        descripcion:
          'Bicicleta de montaña en muy buen estado, ideal para paseos y ejercicio. Incluye casco y luces. Perfecta para rutas urbanas y senderos...',
        imagen:
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
        categoria: 'Deportes',
        tipo: 'prestamo',
        alt: 'Bicicleta',
        estado: 'Prestado',
        fechaCreacion: new Date('2024-01-10'),
      },
      {
        id: 4,
        titulo: 'iPhone 13 Pro',
        descripcion:
          'Smartphone en excelente estado, con todas las funciones operativas. Incluye cargador y funda protectora. Ideal para trabajo y entretenimiento...',
        imagen:
          'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop',
        categoria: 'Tecnología',
        tipo: 'venta',
        alt: 'iPhone',
        estado: 'Vendido',
        fechaCreacion: new Date('2024-01-05'),
      },
      {
        id: 5,
        titulo: 'Cámara Canon EOS',
        descripcion:
          'Cámara profesional en perfecto estado, ideal para fotografía y video. Incluye lente y accesorios básicos. Perfecta para aficionados y profesionales...',
        imagen:
          'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=200&fit=crop',
        categoria: 'Tecnología',
        tipo: 'prestamo',
        alt: 'Cámara Canon',
        estado: 'Disponible',
        fechaCreacion: new Date('2024-01-25'),
      },
      {
        id: 6,
        titulo: 'Guitarra Acústica',
        descripcion:
          'Guitarra acústica en muy buen estado, ideal para principiantes y músicos experimentados. Incluye estuche y cuerdas de repuesto...',
        imagen:
          'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=200&fit=crop',
        categoria: 'Música',
        tipo: 'prestamo',
        alt: 'Guitarra',
        estado: 'Disponible',
        fechaCreacion: new Date('2024-01-30'),
      },
      {
        id: 7,
        titulo: 'Guitarra Acústica',
        descripcion:
          'Guitarra acústica en muy buen estado, ideal para principiantes y músicos experimentados. Incluye estuche y cuerdas de repuesto...',
        imagen:
          'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=200&fit=crop',
        categoria: 'Música',
        tipo: 'prestamo',
        alt: 'Guitarra',
        estado: 'En reparación',
        fechaCreacion: new Date('2024-02-01'),
      },
      {
        id: 8,
        titulo: 'Guitarra Acústica',
        descripcion:
          'Guitarra acústica en muy buen estado, ideal para principiantes y músicos experimentados. Incluye estuche y cuerdas de repuesto...',
        imagen:
          'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=200&fit=crop',
        categoria: 'Música',
        tipo: 'prestamo',
        alt: 'Guitarra',
        estado: 'Reservado',
        fechaCreacion: new Date('2024-02-05'),
      },
      {
        id: 9,
        titulo: 'Guitarra Acústica',
        descripcion:
          'Guitarra acústica en muy buen estado, ideal para principiantes y músicos experimentados. Incluye estuche y cuerdas de repuesto...',
        imagen:
          'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=200&fit=crop',
        categoria: 'Música',
        tipo: 'prestamo',
        alt: 'Guitarra',
        estado: 'Disponible',
        fechaCreacion: new Date('2024-02-10'),
      },
    ];

    // Inicializar artículos filtrados
    this.filteredArticulos = [...this.articulos];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addArticle(): void {
    // TODO: Implementar lógica para agregar artículo
    console.log('Agregar artículo');
  }

  openFilters(): void {
    this.filtersService.setFilterState({
      isOpen: true,
    });
  }

  private applyFilters(): void {
    if (this.filterState.hasActiveFilters) {
      const result = this.filtersService.applyFilters(
        this.articulos,
        this.filterState.filters
      );
      this.filteredArticulos = result.data;
    } else {
      this.filteredArticulos = [...this.articulos];
    }
  }

  onSearchChange(): void {
    if (this.searchTerm.trim()) {
      this.filteredArticulos = this.articulos.filter(
        (articulo) =>
          articulo.titulo
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          articulo.descripcion
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.applyFilters();
    }
  }
}
