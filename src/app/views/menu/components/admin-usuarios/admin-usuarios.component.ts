import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Usuario } from './models/usuario.model';
import { AdminUsuariosFormService } from './services/admin-usuarios-form.service';
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

  constructor(
    private usuarioService: UsuarioService,
    private formService: AdminUsuariosFormService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe((usuarios: any) => {
      this.usuarios = usuarios.map((usuario: Usuario) => ({
        ...usuario,
        ratingPromedio: Math.round(usuario.ratingPromedio * 10) / 10,
      }));
    });
  }

  get usuariosFiltrados(): Usuario[] {
    let filtrados = [...this.usuarios];

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

    const rolFilter = this.filtro.get('rol')?.value;
    if (rolFilter && rolFilter !== 0) {
      filtrados = filtrados.filter((u) => u.rol.codigo === rolFilter);
    }

    return filtrados;
  }

  get filtro() {
    return this.formService.filtroForm;
  }

  get rolesOptionsForDropdown() {
    return this.formService.rolesOptionsForDropdown;
  }

  openFilters(): void {
    this.isOpen = true;
  }

  onFiltersApplied(): void {}

  verDetalles(usuario: Usuario): void {}

  editarUsuario(usuario: Usuario): void {}

  suspenderUsuario(usuario: Usuario): void {}

  activarUsuario(usuario: Usuario): void {}

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
