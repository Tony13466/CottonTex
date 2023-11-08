import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Order } from '../../interfaces/order.interface';
import { OrdersService } from '../../services/orders.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

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

  constructor( private ordersService: OrdersService) {}

  searchOrder() {
    const value: string = this.searchInput.value || '';

    this.ordersService.getSuggestions ( value )
      .subscribe ( orders => this.orders = orders)
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    if ( !event.option.value ){
      this.selectedOrder = undefined;
      return;
    }

    const order: Order = event.option.value;
    this.searchInput.setValue( order.codigo_de_orden);

    this.selectedOrder = order;
  }

}
