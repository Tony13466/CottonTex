import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Order } from 'src/app/orders/interfaces';
import { OrdersService } from 'src/app/orders/services/orders.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-createorder',
  templateUrl: './createorder.component.html',

})
export class CreateorderComponent {
  private fb = inject( FormBuilder );

  public myForm: FormGroup = this.fb.group({

    id_orden:                 ['',[Validators.required, Validators.minLength(5)]],
    codigo_de_orden:          ['',[Validators.required, Validators.minLength(8)]],
    ubicacion:                ['',[Validators.required]],
    cliente:                  ['',[Validators.required]],
    producto:                 ['',[Validators.required]],
    proceso_actual:           ['',[Validators.required]],
    color_elegido:            ['',[Validators.required]],
    cantidad:                 ['',[Validators.required]],
    fecha_de_inicio:          ['',[Validators.required]],
    fecha_estimada_de_salida: ['',[Validators.required]],
    fecha_de_creacion:        ['',[Validators.required]],
  });

  constructor(

    private ordersService: OrdersService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,

    ) {}

  get currentOrder(): Order {
    const order = this.myForm.value as Order;
    return order;
  }

  register(): void {
    if ( this.myForm.invalid ) return;
    this.ordersService.registerOrder( this.currentOrder )
      .subscribe( order => {
        // TODO: mostrar snackbar, y navegar a /users/edit/ user._id
        this.showSnackbar(`La orden ${ order.codigo_de_orden } se creó correctamente!`);
        this.myForm.reset()
      })
  }

  update(): void {
    if ( this.currentOrder.id_orden ) {
      this.ordersService.updateOrder( this.currentOrder )
        .subscribe( order => {
          // TODO: mostrar snackbar
          this.showSnackbar(`La orden ${ order.codigo_de_orden } se actualizó correctamente!`);
        });

      return;
    }
  }

  delete() {
    if ( !this.currentOrder.id_orden ) throw Error('Order id_orden is required');

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.myForm.value
    });

    dialogRef.afterClosed()
    .pipe(
      filter( (result: boolean) => result ),
      switchMap( () => this.ordersService.deleteOrderById( this.currentOrder.id_orden )),
      filter( (wasDeleted: boolean) => wasDeleted ),
      //tap( wasDeleted => console.log( {wasDeleted}) ),
    )
    .subscribe(() => {
      //console.log({result})
      this.router.navigate(['/orders'])
    })
  }

  limpiarDatos() {
    this.myForm.reset()
  }

  showSnackbar( message: string ): void {
    this.snackbar.open( message, 'done', {
      duration: 2500,
    })
  }

}
