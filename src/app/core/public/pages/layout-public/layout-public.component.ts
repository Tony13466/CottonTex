import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
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

  ]

  constructor(private router: Router){}

  onLogout() {
    this.authService.logout();
  }


}
