import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Player} from "../../shared/interfaces";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit{

  form: FormGroup
  passwordForm: FormGroup
  player: Player

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    },{validators: this.matchingPasswords })
  }

  public matchingPasswords: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
    const password = c.get('password');
    const confirmPassword = c.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { mismatchedPasswords: true };
    }
    return null;
  };

  submit(){
    this.player = {
      username: this.form.value.username,
      password: this.form.value.password,
      email: this.form.value.email,
    }
    this.authService.register(this.player)
  }

}
