import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Player} from "../../shared/interfaces";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {Router} from "@angular/router";
import {LinkService} from "../../shared/link.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit,OnDestroy{

  form: FormGroup
  passwordForm: FormGroup
  player: Player | any
  isGoogleForm = false
  notifier = new Subject()


  constructor(private router: Router,
              public authService: AuthService,
              private googleService: SocialAuthService,
              private linkService: LinkService) {
  }

   ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    },{validators: this.matchingPasswords })

     this.googleService.authState.pipe(takeUntil(this.notifier)).subscribe(response => {
       if(!this.player){
         this.player = {
           email: ""
         }
       }
       this.player.username = response.name
       this.player.email = response.email
       this.player.photoUrl = response.photoUrl
       if(!!this.player){
         this.googleForm()
       }
     })
  }


  public matchingPasswords: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
    const password = c.get('password');
    const confirmPassword = c.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { mismatchedPasswords: true };
    }
    return null;
  };

  googleForm(){
    this.isGoogleForm = true
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    },{validators: this.matchingPasswords })
  }

  submit(){
    if(this.isGoogleForm){
      this.player.password = this.form.value.password
      this.authService.register(this.player)
      return
    }
    this.player = {
      username: this.form.value.username,
      password: this.form.value.password,
      email: this.form.value.email,
    }
    this.authService.register(this.player)
    }

  ngOnDestroy(): void {
    this.notifier.next(false)
    this.notifier.complete()
  }

}
