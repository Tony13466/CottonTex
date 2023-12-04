import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { Order } from '../interfaces/order.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})

export class OrdersService {

  private readonly baseUrl: string = environments.baseUrl;

  private http = inject( HttpClient );

  constructor() {

  }

  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>(`${ this.baseUrl }/orders`);
  }

  getOrder ( id_orden: string ): Observable<Order|undefined> {
    return this.http.get<Order>(`${ this.baseUrl }/orders/${ id_orden }`)
  }

  getOrderById( id_orden: string ): Observable<Order|undefined> {
    return this.http.get<Order>(`${ this.baseUrl }/orders/${ id_orden }`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  getOrderStatus ( proceso_actual: string ): Observable<Order> {
    return this.http.get<Order>(`${ this.baseUrl }/orders/${ proceso_actual }`)
  }

  getSuggestions( query: string ): Observable<Order[]> {
    return this.http.get<Order[]>(`${ this.baseUrl }/orders?q=${ query }&_limit=6`);
  }

  addOrder( order: Order ): Observable<Order> {
    return this.http.post<Order>(`${ this.baseUrl }/orders`, order);
  }

  registerOrder ( order: Order ): Observable<Order>{
    return this.http.post<Order>(`${ this.baseUrl }/orders`, order);
  }

  updateOrder( order: Order): Observable<Order>{
    if ( !order.id_orden ) {
      throw Error('Order id is required');
    }

    //return this.http.patch<Order>(`${ this.baseUrl }/orders/${ order.id_orden }`, order);
    return this.http.patch<Order>(`${this.baseUrl}/orders/${order.id_orden}`, order)
    .pipe(
      tap((updatedOrder) => {
        console.log('Order updated successfully:', updatedOrder);
        // Puedes realizar acciones adicionales en caso de éxito.
      }),
      catchError((error) => {
        console.error('Error updating order:', error);
        // Puedes realizar acciones adicionales en caso de error.
        return throwError('Error updating order. Please try again later.');
      })
    );
  }

  deleteOrderById( id_orden: string ): Observable<boolean> {
    return this.http.delete(`${ this.baseUrl }/orders/${ id_orden }`)
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }

  deleteOrder(id_orden: string): Observable<any> {
    const url = `${this.baseUrl}/orders/${id_orden}`;

    return this.http.delete(url)
      .pipe(
        catchError((error) => {
          console.error('Error deleting order:', error);
          // Puedes realizar acciones adicionales en caso de error.
          // Por ejemplo, mostrar un mensaje de error al usuario.
          throw error;
        })
      );
  }





  //onDeleteOrder(){
    //if ( !this.currentOrder.id ) throw Error('Order id is required');

    //const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      //data: this.orderForm.value
  //});

    //dialogRef.afterColsed().suscribe(result => {
      //if ( !result ) return;

      //this.heroesService.deleteOrderById( this.currentOrder.id )
      //.suscribe( wasDeleted => {
        //if ( wasDeleted )
          //this.router.navigate(['/orders']);
    //})

  //});

}
