import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Roles, User } from '../../interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  private fb = inject( FormBuilder );

  public myForm: FormGroup = this.fb.group({

    documento: ['', [ Validators.required, Validators.minLength(8) ]],
    name:      ['',[ Validators.required ]],
    rol:     <Roles>( Roles.admin ),
    email:    ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
  });

  constructor( private authservice: AuthService) {}

  get currentUser(): User {
    const user = this.myForm.value as User;
    return user;
  }

  public rol = [
    { rol: 'admin', desc: 'Rol de administrador'},
    { rol: 'user', desc: 'Rol de usuario' },
  ];

  register(): void {
    if ( this.myForm.invalid ) return;

    if ( this.currentUser._id ) {
      this.authservice.updateUser( this.currentUser )
        .subscribe( user => {
          // TODO: mostrar snackbar
        });

      return;
    }

    this.authservice.registerUser( this.currentUser )
      .subscribe( user => {
        // TODO: mostrar snackbar, y navegar a /users/edit/ user._id
      })
  }

}
