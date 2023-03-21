import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Player} from "../shared/interfaces";
import {ApiService} from "./api.service";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly TOKEN_NAME = 'auth'
  player: Player
  private _isLoggedIn = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this._isLoggedIn.asObservable();

    get token(){
      return localStorage.getItem('auth')
    }


    constructor(private apiService: ApiService,private router: Router) {
       this._isLoggedIn.next(!!this.token)
    }



    login(player:Player){
      this.apiService.login(player).pipe(
        tap((response:any) => {
          this._isLoggedIn.next(true);
          localStorage.setItem('auth', response.token);
          console.log(response.token)
          if(!!response.token)
          this.router.navigate(['/profile'])
        })
      ).subscribe()
    }

    register(player: Player){
      return this.apiService.register(player).pipe(
        tap((response:any) => {
          this._isLoggedIn.next(true);
          localStorage.setItem('auth', response.token);
          console.log(response.token)
          if(!!response.token)
            this.router.navigate(['/profile'])
        })
      ).subscribe()
    }

    Logout(){
      localStorage.clear()
      window.location.reload()
    }

}
