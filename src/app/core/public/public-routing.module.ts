import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPublicComponent } from './pages/layout-public/layout-public.component';
import { ShowdataComponent } from './pages/showdata/showdata.component';
import { HomepublicComponent } from './pages/homepublic/homepublic.component';



const routes: Routes = [{
    path: '',
    component: LayoutPublicComponent,
    children: [
      { path: 'homepublic', component: HomepublicComponent},
      { path: 'showdata', component: ShowdataComponent},
      { path: '**', redirectTo: 'homepublic' },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
