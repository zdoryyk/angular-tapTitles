import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Player} from "../../shared/interfaces";
import {Router} from "@angular/router";
import {BehaviorSubject, Subject, Subscription, take, tap} from "rxjs";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import { Observable, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit,OnDestroy{

  private _isLoggedIn = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this._isLoggedIn.asObservable();

  form: FormGroup
  user: Player
  private authSubscription: Subscription;
  notifier = new Subject()


  constructor(public authService: AuthService, private router: Router,private googleService: SocialAuthService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      password: new FormControl(null,[Validators.required,Validators.nullValidator]),
      email: new FormControl(null, [Validators.required,Validators.email])
    })

      this.googleService.authState.pipe(takeUntil(this.notifier)).subscribe(response => {
        if(!this.user){
          this.user = {
            email: ""
          }
        }
        this.user.email = response.email
        this.googleSubmit()
      })

  }



   googleSubmit(){
    this.authService.login(this.user)
  }

  submit() {
    if(this.form.invalid){
      return
    }
    const player: Player = {
      email: this.form.value.email,
      password: this.form.value.password,
    }
    this.authService.login(player)
  }


  redirectToRegPage() {
    this.router.navigate(['profile/register'])
  }

  ngOnDestroy(): void {
    this.notifier.next(false)
    this.notifier.complete()
  }

}
