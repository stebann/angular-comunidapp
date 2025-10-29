import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
    public authService: AuthService,
    private cdr: ChangeDetectorRef
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;

        console.log(
          '✅ Imagen cargada en base64:',
          base64.substring(0, 40) + '...'
        );

        this.profileService.formUsuario.patchValue({
          avatarUrl: base64,
        });

        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
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
    if (this.form.valid) {
    }
  }
}
