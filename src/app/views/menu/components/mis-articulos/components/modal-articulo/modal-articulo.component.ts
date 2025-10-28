import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FilterOption } from '../../../../../../shared/models/filter-models';
import { FiltersService } from '../../../../../../shared/services/filters.service';
import { MisArticulosService } from '../../services/mis-articulos.service';

@Component({
  selector: 'app-modal-articulo',
  templateUrl: './modal-articulo.component.html',
  styleUrls: ['./modal-articulo.component.scss'],
})
export class ModalArticuloComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  categorias: FilterOption[] = [];
  estados: FilterOption[] = [];
  tiposTransaccion: FilterOption[] = [];

  isDragOver = false;
  selectedFiles: File[] = [];
  previewImages: string[] = [];
  currentImageIndex = 0;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private filtersService: FiltersService,
    private articulosService: MisArticulosService
  ) {}

  async ngOnInit(): Promise<void> {
    // Cargar todos los filtros en paralelo
    const [categorias, estados, tipos] = await Promise.all([
      this.filtersService.getCategorias(),
      this.filtersService.getEstados(),
      this.filtersService.getTiposTransaccion(),
    ]);

    this.categorias = categorias;
    this.estados = estados;
    this.tiposTransaccion = tipos;

    // Observar cambios en el tipo de transacción
    this.form.get('tipoTransaccionId')?.valueChanges.subscribe((value) => {
      const precioControl = this.form.get('precio');
      if (value === '1') {
        // Comparar con string '1' para venta
        // Si es venta
        precioControl?.setValidators([Validators.required]);
      } else {
        precioControl?.clearValidators();
        precioControl?.setValue(null);
      }
      precioControl?.updateValueAndValidity();
    });
  }

  get form() {
    return this.articulosService.formMisArticulos;
  }

  cerrarModal() {
    this.ref.close();
  }

  abrirSelectorArchivos(): void {
    if (this.fileInput) {
      (this.fileInput.nativeElement as HTMLInputElement).click();
    }
  }

  onLeftClick(): void {
    // Si no hay imágenes, abrir el selector al hacer clic en el área
    if (this.previewImages.length === 0) {
      this.abrirSelectorArchivos();
    }
  }

  onArchivosSeleccionados(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files ? Array.from(input.files) : [];
    if (!files.length) return;
    this.agregarArchivos(files);
    // limpiar para permitir volver a seleccionar el mismo archivo
    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    const files = event.dataTransfer
      ? Array.from(event.dataTransfer.files)
      : [];
    if (!files.length) return;
    this.agregarArchivos(files);
  }

  eliminarImagen(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.previewImages.splice(index, 1);
    this.form.get('imagenes')?.setValue(this.selectedFiles);
    this.form.get('imagenes')?.markAsDirty();

    // Ajustar el índice actual si es necesario
    if (this.currentImageIndex >= this.previewImages.length) {
      this.currentImageIndex = Math.max(0, this.previewImages.length - 1);
    }
  }

  anteriorImagen(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  siguienteImagen(): void {
    if (this.currentImageIndex < this.previewImages.length - 1) {
      this.currentImageIndex++;
    }
  }

  seleccionarImagen(index: number): void {
    this.currentImageIndex = index;
  }

  crearArticulo(): void {
    this.form.get('imagenes')?.setValue(this.selectedFiles);
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.ref.close(this.form.value);
  }

  private agregarArchivos(files: File[]): void {
    const espacioDisponible = 5 - this.previewImages.length;
    if (espacioDisponible <= 0) return;

    // Tomar solo los archivos que podemos agregar
    const archivosParaAgregar = files.slice(0, espacioDisponible);

    for (const file of archivosParaAgregar) {
      if (!file.type.startsWith('image/')) continue;
      this.selectedFiles.push(file);
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImages.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    this.form.get('imagenes')?.setValue(this.selectedFiles);
    this.form.get('imagenes')?.markAsDirty();
  }
}
