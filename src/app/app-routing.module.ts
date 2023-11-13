import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
//import { AuthGuard } from './auth/guards/auth.guard';
//import { PublicGuard} from './auth/guards/public.guard';
import { isNotAuthenticatedGuard, isAuthenticatedGuard } from './auth/guards';


// dominio.com/
const routes: Routes = [
  {
    path: 'auth',
    // guards
    //canActivate: [ isNotAuthenticatedGuard ],
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
    // canActivate: [ PublicGuard ],
    // canMatch: [ PublicGuard ]
  },

  {
    path: 'admin',

    loadChildren: () => import('./core/admin/admin.module').then( m => m.AdminModule),
  },

  {
    path: 'public',

    loadChildren: () => import('./core/public/public.module').then( m => m.PublicModule)
  },

  {
    path: 'orders',
    //canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersModule ),
    // canActivate: [ AuthGuard] ,
    // canMatch: [ AuthGuard ]
  },
  {
    path: '**',
    redirectTo: 'admin'
  },
  // {
  //   path: '404',
  //   component: Error404PageComponent,
  // },
  // {
  //   path:'',
  //   redirectTo: 'orders',
  //   pathMatch: 'full'
  // },
  // {
  //   path: '**',
  //   redirectTo: '404',
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
