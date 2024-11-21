import {computed, inject, Injectable, signal} from '@angular/core';
import {environments} from '../../../environments/environments';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, of, throwError} from 'rxjs';
import {AuthStatus, CheckTokenResponse, LoginResponse, User} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );

  //! Al mundo exterior
  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: User, access_token: string): boolean {
    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('token', access_token);
    return true;
  }

  login (login: string, password: string, lang: string): Observable<boolean> {

    const url = `${this.baseUrl}/psigma/login`;

    const body = { login, password, lang };

    return this.http.post<LoginResponse>(url, body, { headers: { 'Content-Type': 'application/json' } })
      .pipe(
        map( ({user, access_token}) => this.setAuthentication(user, access_token) ),
        // MANEJO DE ERRORES
        catchError( err => throwError( () => err.error.error ))
      )
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/psigma/check-token`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logOut();
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map( ({user, access_token}) => this.setAuthentication(user, access_token) ),
        catchError( () => {
          this._authStatus.set( AuthStatus.notAuthenticated );
          return of(false)
        })
      )
  }

  logOut(){
    localStorage.removeItem('token');
    this._currentUser.set( null );
    this._authStatus.set( AuthStatus.notAuthenticated );
  }
}
