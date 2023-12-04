import { Component, OnInit, Input, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../interfaces/order.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit {

  public etapas = [
    "TERMOFIJADO TUBULAR",
    "TERMOFIJADO EN RAMA",
    "TEÑIDO",
    "HIDRO",
    "SECADORA",
    "PERCHADO",
    "ENROLLADO",
    "COMPACTADO TUBULAR",
    "ALMACEN DE TELA ACABADA",
    "DESPACHADO"];
  //public orderStatus = "TERMOFIJADO TUBULAR";

  @Input()
  public order!: Order;
  private authService = inject( AuthService );
  public user = computed(() => this.authService.currentUser() );
  constructor(
    private ordersService: OrdersService,
    //private activateRoute: ActivatedRoute,
    private router: Router,
  ) { }

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

  goBack(): void {
    this.router.navigate([ '/orders/list'])
  }
}





