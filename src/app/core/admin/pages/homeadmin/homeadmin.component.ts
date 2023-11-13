import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/auth/interfaces';
import { AuthService } from '../../../../auth/services/auth.service';


// export interface PeriodicElement {
//     id: string;
//     documento: string;
//     email: string;
//     cliente: string;
//     rol: string;
//   }

// const ELEMENT_DATA: PeriodicElement[] = [
//     {id: {{ user._id }}, documento: '12345678', email: 'user123@gmail.com', cliente: 'H', rol: 'user'}
//     // {id: 2, documento: '12345678', email: 'user123@gmail.com', cliente: 'He', rol: 'user'},
//     // {id: 3, documento: '12345678', email:'user123@gmail.com', cliente: 'Li', rol: 'user'},
//     // {id: 4, documento: '12345678', email: 'user123@gmail.com', cliente: 'Be', rol: 'user'},
//     // {id: 5, documento: '12345678', email: 'user123@gmail.com', cliente: 'B', rol: 'user'},
//     // {id: 6, documento: '12345678', email: 'user123@gmail.com', cliente: 'C', rol: 'user'},
//     // {id: 7, documento: '12345678', email: 'user123@gmail.com', cliente: 'N', rol: 'user'},
//     // {id: 8, documento: '12345678 ', email: 'user123@gmail.com', cliente: 'O', rol: 'user'},
//     // {id: 9, documento: '12345678', email: 'user123@gmail.com', cliente: 'F', rol: 'user'},
//     // {id: 10, documento: '12345678', email: 'user123@gmail.com', cliente: 'Ne', rol: 'user'}
//   ];


@Component({
  selector: 'app-homeadmin',
  templateUrl: './homeadmin.component.html',
  styleUrls: ['./homeadmin.component.scss']
})
export class HomeadminComponent implements OnInit{

  datosUser: any[] = [];
  datos = new MatTableDataSource<User>(this.datosUser);

   displayedColumns: string[] = ['id', 'documento', 'email', 'cliente', 'rol'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.datos.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datos.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private authService: AuthService
  ){ }

  @Input()
  public user!: User;

  ngOnInit(): void {
    //if ( !this.user ) throw Error('User property is required');
    this.authService.getUsers().subscribe((user) => {
      this.datosUser = user;
    });
  }

}
