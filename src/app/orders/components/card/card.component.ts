import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../interfaces/order.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'orders-order-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit{

  // constructor(
  //   private router: Router,
  // ) { }

  @Input()
  public order!: Order;

  ngOnInit(): void {
    if ( !this.order ) throw Error('Order property is required');
  }

  // getOrder(): void {
  //   this.router.navigate(['orders/list/',this.order.id_orden]);
  // }

}
