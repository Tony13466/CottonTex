import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus, Roles } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService );
  const router = inject( Router );

  if ( authService.authStatus() === AuthStatus.authenticated ) {
    // router.navigateByUrl('/dashboard');
    //router.navigateByUrl('/orders');
    // if ( authService.authStatus() === AuthStatus.roladmin) {
    //   router.navigateByUrl('/core/admin');
    // }

    // if ( authService.authStatus() === AuthStatus.roluser) {
    //   router.navigateByUrl('/orders');
    // }

    return true;
  }

  // if ( authService.authStatus() === AuthStatus.checking ) {
  //   return false;
  // }


  // const url = state.url;
  // localStorage.setItem('url', url);
  router.navigateByUrl('/auth/login');
  return false;
};
