import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { OrdersRoutingModule } from './orders-routing.module';
import { MaterialModule } from '../material/material.module';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { CardComponent } from './components/card/card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    OrderPageComponent,
    SearchPageComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OrdersRoutingModule,
    MaterialModule,
    MatPaginatorModule,
    MatProgressBarModule,
    NgxPaginationModule,
    MatSliderModule,
  ]
})
export class OrdersModule { }
