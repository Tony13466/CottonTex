import { Component, inject, OnInit } from '@angular/core';
import { filter, switchMap } from 'rxjs';

import { OrdersService } from 'src/app/orders/services/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/orders/interfaces';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.scss']
})
export class OrderUpdateComponent implements OnInit{
  private fb = inject( FormBuilder );

  public myForm: FormGroup = this.fb.group({

    id_orden:                 ['',[Validators.required, Validators.minLength(5)]],
    codigo_de_orden:          ['',[Validators.required, Validators.minLength(8)]],
    ubicacion:                ['',[Validators.required]],
    cliente:                  ['',[Validators.required]],
    doc_cliente:              ['',[Validators.required, Validators.minLength(8)]],
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
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,

    ) {}

  get currentOrder(): Order {
    const order = this.myForm.value as Order;
    return order;
  }

  ngOnInit(): void {

    if ( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id_orden }) => this.ordersService.getOrderById( id_orden ) ),
      ).subscribe( order => {

        if ( !order ) {
          return this.router.navigateByUrl('/');
        }
        this.myForm.reset( order );
        return;
      });
    }

  // onSubmit(): void {

  //   if ( this.myForm.invalid ) return;

  //   if ( this.currentOrder.id_orden ) {
  //     this.ordersService.updateOrder( this.currentOrder )
  //       .subscribe( order => {
  //         this.showSnackbar(`${ order.codigo_de_orden } updated!`);
  //         //Mostrar snackbar
  //       });
  //     return;
  //   }

  //   this.ordersService.addOrder( this.currentOrder )
  //     .subscribe( order => {
  //       //Mostrar snackbar
  //       this.router.navigate(['/orders/edit', order.id_orden ]);
  //       this.showSnackbar(`${ order.id_orden } created!`);
  //     });
  // }

  update(): void {
    if ( this.currentOrder.id_orden ) {
      this.ordersService.updateOrder( this.currentOrder )
        .subscribe( order => {
          // TODO: mostrar snackbar
          this.showSnackbar(`La orden ${ order.codigo_de_orden } se actualizó correctamente!`);
          this.router.navigate(['/orders'])
        },
        error => {
          // Aquí puedes manejar el error en caso de que la actualización falle.
          console.error('Error updating order:', error);
          // Muestra un snackbar o realiza acciones adicionales en caso de error.
          this.showSnackbar('Error al actualizar la orden. Por favor, inténtalo de nuevo.');
        }
      );
    }
  }

  onDeleteOrder() {
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
        this.showSnackbar(`La orden ${ this.currentOrder.codigo_de_orden } se eliminó correctamente!`);
        this.router.navigate(['/orders'])
      })
  }

    // dialogRef.afterClosed().subscribe(result => {
    //   if (!result ) return;

    //   this.ordersService.deleteOrderById( this.currentOrder.id_orden );
    //   this.router.navigate(['/orders'])
    // });

  showSnackbar( message: string ): void {
    this.snackbar.open( message, 'done', {
      duration: 2500,
    })
  }

  goBack(): void {
    this.router.navigate([ '/orders/list'])
  }

}
