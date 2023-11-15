import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPublicComponent } from './pages/layout-public/layout-public.component';



const routes: Routes = [{
    path: '',
    component: LayoutPublicComponent,
    children: [


    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
