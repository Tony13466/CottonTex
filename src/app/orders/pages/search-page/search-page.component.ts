import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Order } from '../../interfaces/order.interface';
import { OrdersService } from '../../services/orders.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public orders: Order[] = [];
  public selectedOrder?: Order | undefined;


  constructor(
    private ordersService: OrdersService,
    private router: Router,
    ) {}

  searchOrder() {
    const value: string = this.searchInput.value || '';
    console.log({ value })
    this.ordersService.getSuggestions ( value )
      .subscribe ( orders => this.orders = orders);
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    if ( !event.option.value ){
      this.selectedOrder = undefined;
      return;
    }
    if ( event.option.value ) {
      const order: Order = event.option.value;
      this.searchInput.setValue( order.codigo_de_orden );
      this.router.navigate(['/orders',order.id_orden]);
    }

    if ( event.option.value ) {
      const order: Order = event.option.value;
      this.searchInput.setValue( order.id_orden );
      this.router.navigate(['/orders',order.id_orden]);
    }

    //this.router.navigateByUrl('./order.id_orden')


  //   <button mat-button
  //   mat-raised
  //   [routerLink]="['/orders',order.id_orden]">
  //   <mat-icon>more_horiz</mat-icon>
  //   Ver Detalles
  // </button>

    //this.selectedOrder = order;
  }

}
