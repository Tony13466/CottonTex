import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../interfaces/order.interface';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  p: number = 1;

  public orders: Order[] = [];

  constructor( private ordersService: OrdersService ) {}

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe ( orders => this.orders = orders );
  }


}
