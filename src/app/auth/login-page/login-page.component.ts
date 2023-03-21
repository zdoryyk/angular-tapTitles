import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Player} from "../../shared/interfaces";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {BehaviorSubject, tap} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{

  private _isLoggedIn = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this._isLoggedIn.asObservable();

  form: FormGroup

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      password: new FormControl(null,[Validators.required,Validators.nullValidator]),
      email: new FormControl(null, [Validators.required,Validators.email])
    })
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
}
