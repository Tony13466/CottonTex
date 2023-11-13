import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateuserComponent } from './pages/createuser/createuser.component';
import { LayoutAdminComponent } from './pages/layout-admin/layout-admin.component';
import { CreateorderComponent } from './pages/createorder/createorder.component';
import { HomeadminComponent } from './pages/homeadmin/homeadmin.component';


const routes: Routes = [{
    path: '',
    component: LayoutAdminComponent,
    children: [
      { path: 'homeadmin', component: HomeadminComponent},
      { path: 'createuser', component: CreateuserComponent},
      { path: 'createorder', component: CreateorderComponent},
      { path: '**', redirectTo: 'homeadmin' },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
