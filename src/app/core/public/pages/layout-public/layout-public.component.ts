import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-public',
  templateUrl: './layout-public.component.html',
})
export class LayoutPublicComponent {
  private authService = inject( AuthService );

  public user = computed(() => this.authService.currentUser() );

  public sidebarItems = [
    { label: 'Listado de ordenes', icon: 'label', url: '/orders'},
    { label: 'Mis datos', icon: 'label', url: './showdata'},
  ]

  constructor(){}

  onLogout() {
    this.authService.logout();
  }



}
