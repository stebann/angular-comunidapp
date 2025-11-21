import { Component, OnInit } from '@angular/core';
import { AdminGestionPremiumService } from './services/admin-gestion-premium.service';

@Component({
  selector: 'app-admin-gestion-premium',
  templateUrl: './admin-gestion-premium.component.html',
  styleUrls: ['./admin-gestion-premium.component.scss'],
})
export class AdminGestionPremiumComponent implements OnInit {
  searchTerm: string = '';
  isOpen: boolean = false;

  constructor(public adminGestionPremiumService: AdminGestionPremiumService) {}

  ngOnInit(): void {}

  get filtro() {
    return this.adminGestionPremiumService.filtroForm;
  }

  openFilters(): void {
    this.isOpen = true;
  }

  onFiltersApplied(): void {}
}
