import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  private authService = inject( AuthService );
  public user = computed(() => this.authService.currentUser() );

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list'},
    { label: 'Buscar', icon: 'search', url: './search'},
    { label: 'Mis datos', icon: 'label', url: '/public/showdata'},
    //{ label: 'Acceso Admin', icon: 'label', url: '/admin/homeadmin'},

  ]

  constructor(
    //private authService: AuthService,
    private router: Router ){}

  // get user():User | undefined {
  // return this.authService.currentUser;
  // }

  // onLogout() {
  // this.authService.logout();
  //   this.router.navigate(['/auth/login'])
  // }
  onLogout() {
    this.authService.logout();
  }
}
