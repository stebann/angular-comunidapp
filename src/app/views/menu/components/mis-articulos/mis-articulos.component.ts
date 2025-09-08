import { Component } from '@angular/core';

interface Articulo {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  categoria: string;
  tipo: 'prestamo' | 'venta';
  alt: string;
}

@Component({
  selector: 'app-mis-articulos',
  templateUrl: './mis-articulos.component.html',
  styleUrls: ['./mis-articulos.component.scss'],
})
export class MisArticulosComponent {
  articulos: Articulo[] = [
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
    },
  ];
}
