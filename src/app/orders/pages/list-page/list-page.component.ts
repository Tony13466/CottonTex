import { Component, Input, OnInit, computed, inject } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../interfaces/order.interface';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {


  @Input()
  public order!: Order;

  p: number = 1

  public orders: Order[] = [];
  private authService = inject( AuthService );
  public user = computed(() => this.authService.currentUser() );

  constructor( private ordersService: OrdersService ) {}

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe ( orders => this.orders = orders );
  }


}
