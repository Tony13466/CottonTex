import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { OrderUpdateComponent } from '../core/admin/pages/order-update/order-update.component';


// localhost:4200/heroes
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'search', component: SearchPageComponent},
      { path: 'edit/:id_orden', component: OrderUpdateComponent },
      { path: 'list', component: ListPageComponent },
      { path: ':id_orden', component: OrderPageComponent },
      { path: '**', redirectTo: 'list' },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
