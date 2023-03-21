import { Component } from '@angular/core';
import {ApiService} from "../../logged-in/api.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent {


  constructor(private api: ApiService,private authService: AuthService) {

  }

  test(){
    console.log(this.authService.token);
  }

  getPeople() {
    this.api.getAllUsers().subscribe(response =>{
      console.log(response)
    })
  }
}
