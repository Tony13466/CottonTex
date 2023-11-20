import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
// import { User } from '../interfaces/user.interface';
// import { Observable, catchError, map, of, tap } from 'rxjs';
import { AuthStatus, CheckTokenResponse, LoginResponse, User, Roles } from '../interfaces';


@Injectable({providedIn: 'root'})

export class AuthService {

  private readonly baseUrl: string = environments.baseUrl;

  private http = inject( HttpClient );

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );
  private _authRoles = signal<Roles>( Roles.admin);

  //! Al mundo exterior
  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );
  public authRoles = computed( () => this._authRoles());
  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: User, token:string): boolean {

    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('token', token);

    return true;
  }


  private setRoles(roles: Roles, token:string ):boolean {

    this._authRoles.set( roles );
    this._authRoles.set( Roles.admin );
    localStorage.setItem('token', token);
    return true;
  }

  login( email: string, password: string ): Observable<boolean> {

    const url = `${ this.baseUrl }/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>( url, body )
      .pipe(
        map( ({ user, token }) => this.setAuthentication( user, token )),
        // tap( ({ user, token }) => {
        //   this._currentUser.set( user );
        //   this._authStatus.set( AuthStatus.authenticated );
        //   localStorage.setItem('token', token);

        //   //return true;
        //   //console.log({ user, token });
        // }),

        //map( () => true ),

        // Todo: Errores
        catchError( err => throwError( () => err.error.message ))
      );
    //return of(true);
  }

  checkAuthStatus():Observable<boolean> {

    const url   = `${ this.baseUrl }/auth/check-token`;
    const token = localStorage.getItem('token');

    if ( !token ) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);

      return this.http.get<CheckTokenResponse>(url, { headers })
        .pipe(
          map( ({ user, token }) => this.setAuthentication( user, token )),
        // map(  ({ token, user }) => {
        //   this._currentUser.set( user );
        //   this._authStatus.set( AuthStatus.authenticated );
        //   localStorage.setItem('token', token);

        //   return true;
        // }),
        //Error
          catchError(() => {
            this._authStatus.set( AuthStatus.notAuthenticated );
            return of(false);
          })
        );
    //return of(false)
  }

  checkAuthRoles():Observable<boolean> {
    const url   = `${ this.baseUrl }/auth`;
    const token = localStorage.getItem('token');

    if ( !token ) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);

      return this.http.get<CheckTokenResponse>(url, { headers })
        .pipe(
          map( ({ rol, token }) => this.setRoles( rol, token )),

          catchError(() => {
            this._authRoles.set( Roles.user );
            return of(false);
          })
        );
  }



  // registerUser(register: any): Observable<any> {
  //   return this.http.post(this.baseUrl, register);
  // }

  getUsers():Observable<boolean>{
    const url = `${ this.baseUrl }/auth`;
    return this.http.get<CheckTokenResponse>(url)
      .pipe(
        map( ({ user, token }) => this.setAuthentication( user, token )),
        catchError( err => throwError( () => err.error.message ))
      )
  }
  //getUsers():Observable<boolean>{
    //const url = `${ this.baseUrl }/auth/login`;
    // return this.http.get<CheckTokenResponse>(url)
    //  .pipe(
    //   map( ({ user, token }) => this.setAuthentication( user, token )),
    //   catchError( err => throwError( () => err.error.message ))
    //  )
    //return this.http.get<User[]>(`${ this.baseUrl }/auth`);
  //}

  getUser ( _id: string ): Observable<User|undefined> {
    return this.http.get<User>(`${ this.baseUrl }/auth/${ _id }`)

  }

  registerUser( user: User ): Observable<User> {
    return this.http.post<User>(`${ this.baseUrl }/auth/register`, user);
  }

  updateUser( user: User ): Observable<User> {
    if ( !user._id ) throw Error('User _id is required');
    return this.http.patch<User>(`${ this.baseUrl }/auth/register/${ user._id }`, user);
  }

  deleteUserById( _id: string ): Observable<boolean> {
    return this.http.delete(`${ this.baseUrl }/auth/register/${ _id }`)
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated );
  }

  // private baseUrl = environments.baseUrl;
  //  private user?: User;

  // constructor(private http: HttpClient) { }

  // get currentUser():User|undefined {
  //     if ( !this.user ) return undefined;
  //     return structuredClone( this.user );
  // }

  // login( email: string, password: string ):Observable<User> {

  //   return this.http.get<User>(`${ this.baseUrl }/users/1`)
  //   .pipe(
  //     tap( user => this.user = user ),
  //     tap( user => localStorage.setItem('token', 'asdadadadas' )),
  //   );

  // }

  // checkAuthentication(): Observable<boolean> {

  //   if ( !localStorage.getItem('token') ) return of(false);

  //   const token = localStorage.getItem('token');

  //   return this.http.get<User>(`${ this.baseUrl }/users/1`)
  //   .pipe(
  //     tap( user => this.user = user ),
  //     map( user => !!user ),
  //     catchError( err => of(false))
  //   );

  //   logout() {
  //     this.user = undefined;
  //     localStorage.clear();
  //  }

}
