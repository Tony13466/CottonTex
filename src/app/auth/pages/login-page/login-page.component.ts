import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private router = inject( Router )

  public myForm: FormGroup = this.fb.group({
    email:    ['hector_oficial20@gmail.com', [ Validators.required, Validators.email ]],
    password: ['123456', [ Validators.required, Validators.minLength(6) ]],
  });

  login() {
    const { email, password } = this.myForm.value;

    this.authService.login( email, password )
    //this.authService.login('textildias@gmail.com', '123456')
      .subscribe({
        //next: () => this.router.navigateByUrl('/dashboard'),
        next: () => this.router.navigateByUrl('/orders'),
        //console.log('Todo bien!'),
        error: (message) => {
          //Swal.fire('Error', message, 'error' )
          Swal.fire({
            icon: 'error',
            title: message,
            //width: 400,
            //padding: '2em',
            showConfirmButton: true,
            timer: 3000,
            backdrop: ` rgba(0,0,123,0.4)
                         url("../../../../assets/images/fight.gif")
                         left top
                         no-repeat `
          //   // '../../../../assets/images/bg-01.jpg'
          })

        }
      })

  }

  // constructor(
  //   private authService: AuthService,
  //   private router: Router
  // ){}

  // onLogin(): void {

  //   this.authService.login('textildias@gmail.com', '123456')
  //     .subscribe( user => {

  //       this.router.navigate(['/']);
  //     });
  // }

}
