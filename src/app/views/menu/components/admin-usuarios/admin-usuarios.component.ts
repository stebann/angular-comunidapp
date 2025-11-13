import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from './models/usuario.model';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss'],
})
export class AdminUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  searchTerm: string = '';
  isOpen: boolean = false;
  filtroForm: FormGroup;

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      rol: [''],
    });
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios: any) => {
        this.usuarios = usuarios;
      },
      error: (err: any) => {
        console.error('Error al cargar usuarios:', err);
      },
    });
  }

  get usuariosFiltrados(): Usuario[] {
    let filtrados = [...this.usuarios];

    // Filtro por búsqueda
    const term = this.searchTerm?.trim().toLowerCase();
    if (term) {
      filtrados = filtrados.filter(
        (u) =>
          u.nombreCompleto.toLowerCase().includes(term) ||
          u.nombreUsuario.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term) ||
          u.telefono.toLowerCase().includes(term)
      );
    }

    // Filtro por rol
    const rolFilter = this.filtroForm.get('rol')?.value;
    if (rolFilter) {
      filtrados = filtrados.filter((u) => u.rol.nombre === rolFilter);
    }

    return filtrados;
  }

  editarUsuario(usuario: Usuario): void {
    // TODO: Abrir modal de edición
    console.log('Editar:', usuario);
  }

  get filtro() {
    return this.filtroForm;
  }

  openFilters(): void {
    this.isOpen = true;
  }

  onFiltersApplied(): void {
    // Los filtros se aplican automáticamente a través del getter usuariosFiltrados
  }

  verDetalles(usuario: Usuario): void {
    // TODO: Abrir modal o ir a detalle del usuario
    console.log('Ver detalles:', usuario);
  }

  suspenderUsuario(usuario: Usuario): void {
    // TODO: Suspender usuario
    console.log('Suspender:', usuario);
  }

  activarUsuario(usuario: Usuario): void {
    // TODO: Activar usuario
    console.log('Activar:', usuario);
  }

  getOpcionesFor(usuario: Usuario): any[] {
    return [
      {
        icon: 'pi pi-eye',
        label: 'Ver',
        command: () => this.verDetalles(usuario),
      },
      {
        icon: 'pi pi-pencil',
        label: 'Editar',
        command: () => this.editarUsuario(usuario),
      },
      {
        icon: 'pi pi-ban',
        label: 'Suspender',
        command: () => this.suspenderUsuario(usuario),
      },
    ];
  }
}
