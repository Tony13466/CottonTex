import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-public',
  templateUrl: './layout-public.component.html',
  styleUrls: ['./layout-public.component.scss']
})
export class LayoutPublicComponent {
  private authService = inject( AuthService );

  public user = computed(() => this.authService.currentUser() );

  public sidebarItems = [
    { label: 'Crear Usuario', icon: 'label', url: './createuser'},
    { label: 'Crear Orden', icon: 'label', url: './createorder'},
    { label: 'Mis datos', icon: 'label', url: './showdata'},
  ]

  constructor(){}

  onLogout() {
    this.authService.logout();
  }



}
