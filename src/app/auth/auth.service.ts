import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, Subject, tap, throwError} from "rxjs";
import {Player} from "../shared/interfaces";
import {ApiService} from "../logged-in/api.service";
import {Router} from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import {ProfileComponent} from "../logged-in/profile/profile.component";
import {AppRoutingModule} from "../app-routing.module";
import {LoginModule} from "../logged-in/login.module";
import {ERROR} from "@angular/compiler-cli/src/ngtsc/logging/src/console_logger";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public error$: Subject<string> = new Subject<string>()
  public readonly TOKEN_NAME = 'auth'
  player: Player
  private _isLoggedIn = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this._isLoggedIn.asObservable();
  private temp = false;

    get token(){
      return localStorage.getItem('auth')
    }


    constructor(private apiService: ApiService,private router: Router,private jwtHelper: JwtHelperService) {
       this._isLoggedIn.next(!!this.token)
    }

    login(player:Player){
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

    private handleError(error:HttpErrorResponse){
      console.log(error.error.message);
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

    register(player: Player){
      return this.apiService.register(player).pipe(
        tap((response:any) => {
          this._isLoggedIn.next(true);
          localStorage.setItem('auth', response.token);
          console.log(response.token)
          if(!!response.token) {
            this.router.navigate(['/profile'])
          }
        }),catchError(this.handleError.bind(this))
      ).subscribe()
    }

    logout(){
      localStorage.clear()
      window.location.reload()
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

}
