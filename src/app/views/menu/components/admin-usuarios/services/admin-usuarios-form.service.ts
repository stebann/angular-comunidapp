import { Injectable } from '@angular/core';
import { FilterOption } from 'src/app/shared/models/filter-models';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { AdminUsuariosRepository } from '../repositories/admin-usuarios-repository';

@Injectable({
  providedIn: 'root',
})
export class AdminUsuariosFormService extends AdminUsuariosRepository {
  public filtroForm = this.form();
  rolesOptions: FilterOption[] = [];

  constructor(private filtersService: FiltersService) {
    super();
    this.cargarRoles();
  }

  private cargarRoles(): void {
    this.filtersService.getRoles().subscribe((roles: FilterOption[]) => {
      this.rolesOptions = roles;
    });
  }

  get rolesOptionsForDropdown() {
    return [
      { label: 'Todos', value: '' },
      ...this.rolesOptions.map((r) => ({ label: r.label, value: r.label })),
    ];
  }
}
