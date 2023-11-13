import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Roles, User } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
})

export class CreateuserComponent {

  private fb = inject( FormBuilder );

  public myForm: FormGroup = this.fb.group({

    documento: ['', [ Validators.required, Validators.minLength(8) ]],
    name:      ['',[ Validators.required ]],
    rol:     <Roles>( Roles.admin ),
    email:    ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
  });

  constructor(

    private authservice: AuthService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,

    ) {}

  get currentUser(): User {
    const user = this.myForm.value as User;
    return user;
  }

  public rol = [
    { rol: 'admin', desc: 'Rol de administrador'},
    { rol: 'user', desc: 'Rol de usuario' },
  ]

  register(): void {
    if ( this.myForm.invalid ) return;
    this.authservice.registerUser( this.currentUser )
      .subscribe( user => {
        // TODO: mostrar snackbar, y navegar a /users/edit/ user._id
        this.showSnackbar(`El usuario ${ user.name } se creó correctamente!`);
        this.myForm.reset()
      })
  }

  update(): void {
    if ( this.currentUser._id ) {
      this.authservice.updateUser( this.currentUser )
        .subscribe( user => {
          // TODO: mostrar snackbar
          this.showSnackbar(`El usuario ${ user.name } se actualizó correctamente!`);
        });

      return;
    }
  }

  delete() {
    if ( !this.currentUser._id ) throw Error('User _id is required');

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.myForm.value
    });

    dialogRef.afterClosed()
    .pipe(
      filter( (result: boolean) => result ),
      switchMap( () => this.authservice.deleteUserById( this.currentUser._id )),
      filter( (wasDeleted: boolean) => wasDeleted ),
      //tap( wasDeleted => console.log( {wasDeleted}) ),
    )
    .subscribe(() => {
      //console.log({result})
      this.router.navigate(['/users'])
    })
  }


  limpiarDatos() {
    this.myForm.reset()
  }

  showSnackbar( message: string ): void {
    this.snackbar.open( message, 'done', {
      duration: 2500,
    })
  }
}
