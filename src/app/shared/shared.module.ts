import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import { ArticuloCardComponent } from './components/articulo-card/articulo-card.component';
import { ArticuloDetailComponent } from './components/articulo-detail/articulo-detail.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DropdownFieldComponent } from './components/dropdown-field/dropdown-field.component';
import { GenericFilterComponent } from './components/generic-filter/generic-filter.component';
import { InputDateFieldComponent } from './components/input-date-field/input-date-field.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { ModalComponent } from './components/modal/modal.component';
import { OpcionesComponent } from './components/opciones/opciones.component';
import { RangeFieldComponent } from './components/range-field/range-field.component';
import { SearchHeaderComponent } from './components/search-header/search-header.component';

@NgModule({
  declarations: [
    InputFieldComponent,
    InputDateFieldComponent,
    ButtonComponent,
    CheckboxComponent,
    DropdownFieldComponent,

    GenericFilterComponent,
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
    ChartModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    MultiSelectModule,
    OverlayPanelModule,
    DynamicDialogModule,
    NgxChartsModule,
  ],
  exports: [
    InputFieldComponent,
    InputDateFieldComponent,
    ButtonComponent,
    CheckboxComponent,
    DropdownFieldComponent,

    GenericFilterComponent,
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
    InputTextareaModule,
    MultiSelectModule,
    DynamicDialogModule,
    ChartModule,
    NgxChartsModule,
  ],
  providers: [DialogService],
})
export class SharedModule {}
