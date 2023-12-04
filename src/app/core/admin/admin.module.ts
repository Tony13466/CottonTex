import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateuserComponent } from './pages/createuser/createuser.component';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutAdminComponent } from './pages/layout-admin/layout-admin.component';
import { CreateorderComponent } from './pages/createorder/createorder.component';
import { MaterialModule } from 'src/app/material/material.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeadminComponent } from './pages/homeadmin/homeadmin.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { OrderUpdateComponent } from './pages/order-update/order-update.component';



@NgModule({
  declarations: [
    CreateuserComponent,
    LayoutAdminComponent,
    CreateorderComponent,
    HomeadminComponent,
    ConfirmDialogComponent,
    OrderUpdateComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MaterialModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class AdminModule { }
