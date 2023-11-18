
import { Component, ViewChild, inject, computed, signal } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../../../auth/services/auth.service';
import { Roles } from 'src/app/auth/interfaces';


interface MenuTableItems {
    id: string;
    documento: string;
    email: string;
    name: string;
    rol: string;
  }


const ELEMENT_DATA: MenuTableItems[] = [];

const numRows = 10;

for ( let i = 0; i < numRows; i++ ) {
  ELEMENT_DATA.push({ id: '', documento: ' ', email: '', name: '', rol: ''});
}


// const ELEMENT_DATA: MenuTableItems[] = [
//     {id: '', documento: ' ', email: '', name: '', rol: ' '},
//     {id: '', documento: ' ', email: '', name: '', rol: ' '},
//     {id: '', documento: ' ', email: '', name: '', rol: ' '},
//     {id: '', documento: ' ', email: '', name: '', rol: ' '},
//     {id: '', documento: ' ', email: '', name: '', rol: ' '},
//     {id: '', documento: ' ', email: '', name: '', rol: ' '},
//     {id: '', documento: ' ', email: '', name: '', rol: ' '},
//     {id: '', documento: ' ', email: '', name: '', rol: ' '},
//     {id: '', documento: ' ', email: '', name: '', rol: ' '},
//     {id: '', documento: ' ', email: '', name: '', rol: ' '},
//     {id: '', documento: ' ', email: '', name: '', rol: ' '},
//     {id: '', documento: ' ', email: '', name: '', rol: ' '},
//   ];




@Component({
  selector: 'app-homeadmin',
  templateUrl: './homeadmin.component.html',
  styleUrls: ['./homeadmin.component.scss']
})
export class HomeadminComponent {

  private authService = inject( AuthService );

  public user = computed(() => this.authService.currentUser() );


  //datosUser: any[] = [];
  //datos = new MatTableDataSource<User>(this.datosUser);

   displayedColumns: string[] = ['id', 'documento', 'email', 'cliente', 'rol'];
   dataSource = new MatTableDataSource<MenuTableItems>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(

  ){ }



}
