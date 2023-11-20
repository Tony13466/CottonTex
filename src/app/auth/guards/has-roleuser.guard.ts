import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';
import { Roles } from '../interfaces/auth-roles.enum';


export const hasRoleUserGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService );

  const router = inject( Router );

  if ( authService.authRoles() === Roles.user ){
    return true;
  }



  router.navigateByUrl('/auth/login');
  return false;
};
