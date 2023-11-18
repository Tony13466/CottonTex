import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPublicComponent } from './pages/layout-public/layout-public.component';
import { ShowdataComponent } from './pages/showdata/showdata.component';
import { HomepublicComponent } from './pages/homepublic/homepublic.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialModule } from 'src/app/material/material.module';
import { PublicRoutingModule } from './public-routing.module';



@NgModule({
  declarations: [
    LayoutPublicComponent,
    ShowdataComponent,
    HomepublicComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PublicRoutingModule,
    MaterialModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class PublicModule { }
