import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPublicComponent } from './pages/layout-public/layout-public.component';
import { PublicRoutingModule } from './public-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    LayoutPublicComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MaterialModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class PublicModule { }
