import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/core/services/auth.service';
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
  ventaId: any = null;

  isDragOver = false;
  selectedFiles: File[] = [];
  previewImages: string[] = [];
  currentImageIndex = 0;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private filtersService: FiltersService,
    private articulosService: MisArticulosService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.filtersService
      .getCategorias()
      .subscribe((categorias) => (this.categorias = categorias));

    this.filtersService
      .getEstados()
      .subscribe((estados) => (this.estados = estados));

    this.filtersService.getTiposTransaccion().subscribe((tipos) => {
      this.tiposTransaccion = tipos;
      // Obtener el ID de Venta
      const ventaTipo = tipos.find((t) => t.label.toLowerCase() === 'venta');
      if (ventaTipo) {
        this.ventaId = ventaTipo.value;
      }
    });

    // Observar cambios en el tipo de transacción
    this.form.get('tipoTransaccionId')?.valueChanges.subscribe((value) => {
      const precioControl = this.form.get('precio');
      if (value == this.ventaId) {
        precioControl?.setValidators([Validators.required, Validators.min(0)]);
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
    if (this.form.invalid || this.selectedFiles.length === 0) {
      return;
    }

    const usuario = this.authService.currentState;

    this.articulosService
      .crear(usuario.id, this.selectedFiles)
      .subscribe((response) => {
        // Limpiar formulario y archivos
        this.form.reset();
        this.selectedFiles = [];
        this.previewImages = [];
        this.currentImageIndex = 0;

        // Recargar artículos y cerrar modal
        this.articulosService.getMisArticulos(usuario.id);
        this.ref.close({ success: true, data: response });
      });
  }

  private agregarArchivos(files: File[]): void {
    const espacioDisponible = 5 - this.previewImages.length;
    if (espacioDisponible <= 0) return;

    const archivosParaAgregar = files.slice(0, espacioDisponible);
    const imagenesBase64: string[] = [];

    for (const file of archivosParaAgregar) {
      if (!file.type.startsWith('image/')) continue;

      this.selectedFiles.push(file);
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        this.previewImages.push(base64String);
        imagenesBase64.push(base64String);

        // Actualizamos el form cuando se han procesado todas las imágenes
        if (imagenesBase64.length === archivosParaAgregar.length) {
          this.form.get('imagenes')?.setValue(imagenesBase64);
          this.form.get('imagenes')?.markAsDirty();
        }
      };

      reader.readAsDataURL(file);
    }
  }
}
