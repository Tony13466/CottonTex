import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})

export class DashboardLayoutComponent {

  private authService = inject( AuthService );

  public user = computed(() => this.authService.currentUser() );

  // get user() {
  //   return this.authService.currentUser();
  // }

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list'},
    { label: 'Buscar', icon: 'search', url: './search'},
    { label: 'Ordenes', icon: 'label', url: '/order'}
  ]

  onLogout() {
    this.authService.logout();
  }

}
