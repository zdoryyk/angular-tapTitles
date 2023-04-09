import {Injectable, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Player} from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class LinkService implements OnInit{

  private email: string
  public player: Player
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

  async setPlayer(player: Player){
    this.player = player
  }

  getUser(){
    return this.player
  }


}
