import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Player} from "../../shared/interfaces";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  user: Player = {
    username: '',
    email: '',
    password: '',
    created_on: new Date()
  }


  constructor(private authService:AuthService,private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.setPlayer()
  }

   setPlayer() {
    let response = this.authService._decodedToken$()
    const email = response.email
    this.apiService.getUserByEmail(email).subscribe(response => {
      this.user = response
      console.log(this.user);
    })
  }



}
