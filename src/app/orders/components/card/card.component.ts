import { Component, Input, OnInit, computed, inject } from '@angular/core';
import { Order } from '../../interfaces/order.interface';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Roles } from '../../../auth/interfaces/auth-roles.enum';

@Component({
  selector: 'orders-order-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit{

  private authService = inject( AuthService );

  public user = computed(() => this.authService.currentUser() );
  public roles = computed(() => this.authService.authRoles() );
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
