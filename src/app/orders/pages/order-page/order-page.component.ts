import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { OrdersService } from '../../services/orders.service';
import { Order } from '../../interfaces/order.interface';


@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styles: [
  ]
})
export class OrderPageComponent implements OnInit {

  //public order?: Order;

  //@Input() id:any = '';

  @Input()
  public order!: Order;

  constructor(
    private ordersService: OrdersService,
    //private activateRoute: ActivatedRoute,
    private router: Router,
  ) { }

  //ngOnInit(): void {

  ngOnInit(): void {
    // if ( !this.order ) throw Error('Order property is required');

    this.getData();

  }

  getData(): void {
    const url = this.router.url.split('/');
    this.ordersService.getOrder(url[2]).subscribe(
      (order: any) => {
        console.log(order);
        this.order = order;
      });

    }




    // this.activateRoute.params
    //   .pipe(
    //     switchMap( ({ id_orden }) => this.ordersService.getOrder( id_orden )),
    //   )
    //   .subscribe( order => {
    //     if ( !order ) return this.router.navigate([ '/orders/list'])
    //     //console.log(order)
    //     this.order = order;
    //     //console.log(this.order.cantidad)
    //     return;
    //   })

    goBack(): void {
      // ahora si

    }
  }

  // goBack() :void {

  // }




