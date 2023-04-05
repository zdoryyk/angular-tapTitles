import { Injectable } from '@angular/core';
import {Player, PlayerToSend} from "../shared/interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  player: Player
  private AUTH_PAGE = 'http://localhost:8080/api/auth'
  private API_USERS = 'http://localhost:8080/api/users'

  constructor(private http: HttpClient) { }


  login(player:Player): Observable<Player>{
    return this.http.post<Player>(`${this.AUTH_PAGE}/login`,player)
  }

  register(player: Player): Observable<Player>{
    return this.http.post<Player>(`${this.AUTH_PAGE}/register`,player)
  }

  getAllUsers():Observable<Player[]>{
    return this.http.get<Player[]>(`${this.API_USERS}`)
  }

  getUserByEmail(email:string): Observable<Player>{
      let playerToSend: PlayerToSend = {
        email: email
      }
    return this.http.post<Player>(`${this.API_USERS}/user/email`,playerToSend)
  }

  getUserById(id: number): Observable<Player>{
    let playerToSend: PlayerToSend = {
      id: id
    }
    return this.http.post<Player>(`${this.API_USERS}/user/id`,playerToSend)
  }

  deleteUser(email: string): Observable<any> {
    let playerToSend: PlayerToSend = {
      email: email
    }
    return this.http.delete(`${this.API_USERS}/user/delete`, { body: playerToSend });
  }

}
