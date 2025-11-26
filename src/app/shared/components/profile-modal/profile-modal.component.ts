import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from './services/profile.service';

@Component({
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss'],
})
export class ProfileModalComponent implements OnInit {
  constructor(
    public profileService: ProfileService,
    public ref: DynamicDialogRef,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentState = this.authService.currentState;
    if (currentState?.id) {
      this.profileService.usuarioById(currentState.id);
    }
  }

  get form() {
    return this.profileService.formUsuario;
  }

  getInitials(fullName: string): string {
    if (!fullName) return '';
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0).toUpperCase() +
      parts[parts.length - 1].charAt(0).toUpperCase()
    );
  }

  onCancel(): void {
    this.ref.close();
  }

  onSave(): void {
    if (!this.form.valid) {
      return;
    }

    const currentState = this.authService.currentState;
    if (!currentState?.id) {
      return;
    }

    this.profileService.update(currentState.id).subscribe((usuario) => {
      // Actualizar datos básicos en el AuthService para reflejar cambios en el topbar
      this.authService.setAuth({
        id: currentState.id,
        nombre: usuario?.nombreCompleto ?? currentState.nombre,
        email: usuario?.email ?? currentState.email,
      });

      this.ref.close('success');
    });
  }
}
