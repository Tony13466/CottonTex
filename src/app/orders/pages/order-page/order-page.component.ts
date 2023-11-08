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
    private activateRoute: ActivatedRoute,
    private router: Router,
  ) { }

  //ngOnInit(): void {

  ngOnInit(): void {
    // if ( !this.order ) throw Error('Order property is required');

    this.getData();

  }

  getData(): void {
    const url = this.router.url.split('/');

    // la constante URL es un array, que esta trayendo la ruta actual http://localhost:4200/orders/38671 ok
    // le pongo url[2] para entrar al indice 2, que es el 3 elemento del array. este tiene tu ID : 38671 y eso lo busco en tu endpoint

    console.log('SOY LA URL', url);


    this.ordersService.getOrder(url[2]).subscribe( //y ese url 2 ??
      (order: any) => {
        console.log(order);

         // asi diferencias mas rapido en que pantalla estas xd, cambialo con f1 peacock o algo asi xd era necesario? :v no pero esta mejor :v no quieres hacer el proyecto mejor? :v
        // otra cosa, mas legible xd

        // si te creas una cuenta de github students con tu correo universitario o validas tus datos con tu carnet, te dan gratis el github copilot, ese programa por ti xd pa que es, osea si yo tengo una funcion que declare sumarNotas(): { mientras voy escribiendo, te va dando sugerencias que solo presionando tab te completa toda la funcion xd, sirve bastante porque se sabe el uso de la mayoria de librerias que hay mmm y con una cuenta normal no te dan esa vaina?,  te cobran, metida de rata}

        // si te das cuyenta en la consola es un array de 3 elementos, a ti te interesa el tercer elemento porque es tu id a consultar, hasta ahi bien? ya si y entras al url[2] porque el indice empieza en 0. SOlo hay 3 entonces? en este caso si, si tu ruta fuera mas grande tal vez asi: orders/orden/elemento/12376123 ahi si tienes mas elementos en el "url", solo te interesa el ultimo al final http://localhost:4200/orders/38671 ya entendi xd

        // ahora, quita ese tema asqueroso :v
        this.order = order; // este es el objeto a ok

        // si te das cuenta en la consola tu back responde con un array de un solo elemento, por eso al asignarlo al this.order, entro en el indice 0, para hacer referencia al primer elemento del array

        // listo? pero, cuando lo llamo en el html no importa? o sea, poniendo [0] estas llamando a todo el array, no, esta llamando solo al primer elemento de indice 0, osea mira

        // ahora me devuelve solo el objeto, era solo eso

        // mongoose internamente lo que hace es buscar de una lista de objetos (colecciones), el elemento que coincida con tu busqueda y lo filtra, osea si hay multiples objetos, solo te devuelve 1, que es el que buscas, por eso por defecto te trae un array = [{...}] y no el {...} directo aea, facilito papai pero osea vamo al hmtl


        // solo llama al elemento necesario, no a todo y a tu html no le afecta, o sea, el array 0 tiene almacenada toda esa info, si mira aqui, es porque tu api lo hiciste asi xd pero mira asi lo corriges

        // if(order[0]) {
        //   this.order = order[0];
        // } else {
        //   this.router.navigate([ '/orders/list'])
        // }
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




