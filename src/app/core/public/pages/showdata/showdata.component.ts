import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-showdata',
  templateUrl: './showdata.component.html',
  styleUrls: ['./showdata.component.scss']
})
export class ShowdataComponent {
  private fb = inject( FormBuilder );

  public myForm: FormGroup = this.fb.group({

    documento: ['', [ Validators.required, Validators.minLength(8) ]],
    name:      ['',[ Validators.required ]],
    email:    ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
  });

  constructor(

    private authService: AuthService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,

  ) {}

  get currentUser(): User {
    const user = this.myForm.value as User;
    return user;
  }

  update(): void {
    if ( this.currentUser._id ) {
      this.authService.updateUser( this.currentUser )
        .subscribe( user => {
          // TODO: mostrar snackbar
          this.showSnackbar(`El usuario ${ user.name } se actualizó correctamente!`);
        });

      return;
    }
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
