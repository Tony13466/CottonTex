import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Order } from '../interfaces/order.interface';
import { environments } from '../../../environments/environments';


@Injectable({providedIn: 'root'})

export class OrdersService {

  private baseUrl: string = environments.baseUrl;

  //private http = inject( HttpClient );

  constructor(private http: HttpClient) {}

  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>(`${ this.baseUrl }/orders`);
  }

  getOrder ( id_orden: string ): Observable<Order|undefined> {
    return this.http.get<Order>(`${ this.baseUrl }/orders/${ id_orden }`)
  }

  getSuggestions( query: string ): Observable<Order[]> {
    return this.http.get<Order[]>(`${ this.baseUrl }/orders?q=${ query }&_limit=6`);
  }

  addOrder ( order: Order ): Observable<Order>{
    return this.http.post<Order>(`${ this.baseUrl }/orders`, order);
  }

  updateOrder( order: Order): Observable<Order>{
    if ( !order.id_orden ) throw Error('Order id is required');

    return this.http.patch<Order>(`${ this.baseUrl }/orders/${ order.id_orden }`, order);
  }

  deleteOrderById( id_orden: string ): Observable<boolean> {

    return this.http.delete(`${ this.baseUrl }/orders/${ id_orden }`)
    .pipe(
      catchError( err => of(false) ),
      map( resp => true )
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
