import {Injectable, OnInit} from '@angular/core';
import {ApiService} from "../logged-in/api.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LinkService implements OnInit{

  private email: string
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  addUser(email: string){
    this.email = email
  }

  returnUser(){
    return this.email
  }

  returnUsersId(){
    return this.auth.getIdFromToken();
  }


}
