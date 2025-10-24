import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import { ArticuloCardComponent } from './components/articulo-card/articulo-card.component';
import { ArticuloDetailComponent } from './components/articulo-detail/articulo-detail.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DropdownFieldComponent } from './components/dropdown-field/dropdown-field.component';
import { FiltersSidebarComponent } from './components/filters-sidebar/filters-sidebar.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { ModalComponent } from './components/modal/modal.component';
import { OpcionesComponent } from './components/opciones/opciones.component';
import { RangeFieldComponent } from './components/range-field/range-field.component';
import { SearchHeaderComponent } from './components/search-header/search-header.component';

@NgModule({
  declarations: [
    InputFieldComponent,
    ButtonComponent,
    CheckboxComponent,
    DropdownFieldComponent,
    FiltersSidebarComponent,
    RangeFieldComponent,
    ModalComponent,
    ArticuloCardComponent,
    OpcionesComponent,
    SearchHeaderComponent,
    ArticuloDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DropdownModule,
    MenuModule,
    CalendarModule,
    InputNumberModule,
    InputTextModule,
    MultiSelectModule,
    OverlayPanelModule,
  ],
  exports: [
    InputFieldComponent,
    ButtonComponent,
    CheckboxComponent,
    DropdownFieldComponent,
    FiltersSidebarComponent,
    RangeFieldComponent,
    ModalComponent,
    ArticuloCardComponent,
    OpcionesComponent,
    SearchHeaderComponent,
    CommonModule,
    ArticuloDetailComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DropdownModule,
    MenuModule,
    CalendarModule,
    InputNumberModule,
    InputTextModule,
    MultiSelectModule,
  ],
})
export class SharedModule {}
