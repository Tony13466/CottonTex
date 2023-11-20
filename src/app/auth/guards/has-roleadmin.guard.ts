import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus, User } from '../interfaces';
import { Roles } from '../interfaces/auth-roles.enum';


export const hasRoleAdminGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService );

  const router = inject( Router );

  if ( authService.authRoles() === Roles.admin ){
    return true;
  }




  return false;
};
