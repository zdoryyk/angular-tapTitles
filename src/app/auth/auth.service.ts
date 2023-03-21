import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Player} from "../shared/interfaces";
import {ApiService} from "../logged-in/api.service";
import {Router} from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly TOKEN_NAME = 'auth'
  player: Player
  private _isLoggedIn = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this._isLoggedIn.asObservable();
  private temp = false;

    get token(){
      return localStorage.getItem('auth')
    }


    constructor(private apiService: ApiService,private router: Router,private jwtHelper: JwtHelperService ) {
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
        })
      ).subscribe()
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
        })
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
