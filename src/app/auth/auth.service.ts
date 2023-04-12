import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, Subject, tap, throwError} from "rxjs";
import {Player} from "../shared/interfaces";
import {ApiService} from "../logged-in/api.service";
import {Router} from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public error$: Subject<string> = new Subject<string>()
  private _isLoggedIn = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this._isLoggedIn.asObservable();
  _isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private temp = false;

    get token(){
      return localStorage.getItem('auth')
    }

    constructor(private apiService: ApiService,private router: Router,private jwtHelper: JwtHelperService) {
      this._isLoggedIn.next(!!this.token)
    }

    login(player:Player){
      console.log(player)
      this.apiService.login(player).pipe(
        tap((response:any) => {
          this._isLoggedIn.next(true);
          localStorage.setItem('auth', response.token);
          if(!!response.token) {
            this.router.navigate(['/profile'])
          }
        }),
        // @ts-ignore
        catchError(this.handleError.bind(this))
      ).subscribe()
    }

    register(player: Player){
      return this.apiService.register(player).pipe(
        tap((response:any) => {
          this._isLoggedIn.next(true);
          localStorage.setItem('auth', response.token);
          if(!!response.token) {
            this.router.navigate(['/profile'])
          }
        }),catchError(this.handleError.bind(this))
      ).subscribe()
    }

    _isAdmin(): Observable<boolean> {
      if(this._decodedToken$() != null) {
        this._isAdmin$.next(this._decodedToken$().role == 'ROLE_ADMIN');
      } else {
        this._isAdmin$.next(false);
      }
      return this._isAdmin$.asObservable();
    }

    getIdFromToken():number{
      return this._decodedToken$().id
    }

    async logout(){
      console.log(123)
      await window.location.reload()
      await localStorage.clear()
      await this._isLoggedIn.next(false)
    }

    _decodedToken$(){
      return this.jwtHelper.decodeToken(localStorage.getItem('auth') as string)
    }


    _loggedIn$(){
      const token = localStorage.getItem('auth')
      if(token === null){
        this.temp = true
        return null
      }
      return !this.jwtHelper.isTokenExpired(token)
    }

  private handleError(error:HttpErrorResponse){
    const m = error.error.message
    switch (m){
      case 'THIS_EMAIL_TAKEN':
        this.error$.next('This email taken')
        break
      case 'THIS_USERNAME_TAKEN':
        this.error$.next('This username taken')
        break
      default:
        this.error$.next('Incorrect email or password')
        break
    }
    return throwError(error)
  }
}
