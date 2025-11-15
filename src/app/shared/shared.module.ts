import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { EmptyPlaceholderComponent } from './components/empty-placeholder/empty-placeholder.component';

import { ConfirmationService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FiltersService } from './services/filters.service';

import { ArticuloCardComponent } from './components/articulo-card/articulo-card.component';
import { ArticuloDetailComponent } from './components/articulo-detail/articulo-detail.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DropdownFieldComponent } from './components/dropdown-field/dropdown-field.component';
import { GenericFilterComponent } from './components/generic-filter/generic-filter.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { InputDateFieldComponent } from './components/input-date-field/input-date-field.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { InputNumberFieldComponent } from './components/input-number-field/input-number-field.component';
import { ModalComponent } from './components/modal/modal.component';
import { OpcionesComponent } from './components/opciones/opciones.component';
import { ProfileModalComponent } from './components/profile-modal/profile-modal.component';
import { RangeFieldComponent } from './components/range-field/range-field.component';
import { SearchHeaderComponent } from './components/search-header/search-header.component';
import { TextareaFieldComponent } from './components/textarea-field/textarea-field.component';
import { SolicitudMessageComponent } from './components/articulo-detail/solicitud-articulo-modal/solicitud-message.component';

@NgModule({
  declarations: [
    InputFieldComponent,
    InputNumberFieldComponent,
    InputDateFieldComponent,
    ButtonComponent,
    CheckboxComponent,
    DropdownFieldComponent,
    TextareaFieldComponent,
    EmptyPlaceholderComponent,
    GenericFilterComponent,
    RangeFieldComponent,
    ModalComponent,
    ArticuloCardComponent,
    OpcionesComponent,
    SearchHeaderComponent,
    SolicitudMessageComponent,
    ArticuloDetailComponent,
    ProfileModalComponent,
    ImageViewerComponent,
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
    ConfirmDialogModule,
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
    InputNumberFieldComponent,
    InputDateFieldComponent,
    ButtonComponent,
    CheckboxComponent,
    DropdownFieldComponent,
    EmptyPlaceholderComponent,
    GenericFilterComponent,
    RangeFieldComponent,
    ModalComponent,
    ArticuloCardComponent,
    OpcionesComponent,
    SearchHeaderComponent,
    TextareaFieldComponent,
    CommonModule,
    ArticuloDetailComponent,
    SolicitudMessageComponent,
    ImageViewerComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DropdownModule,
    MenuModule,
    CalendarModule,
    ConfirmDialogModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    MultiSelectModule,
    DynamicDialogModule,
    ChartModule,
    NgxChartsModule,
  ],
  providers: [DialogService, ConfirmationService, FiltersService],
})
export class SharedModule {}
