import { Injectable } from '@angular/core';
import {Player, PlayerToSend, Review} from "../shared/interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  player: Player
  private readonly AUTH_PAGE = 'http://localhost:8080/api/auth'
  private readonly API_USERS = 'http://localhost:8080/api/users'
  private readonly COMMENT_API = 'http://localhost:8080/api/comment'

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

  deleteUser(email: string): Observable<any> {
    let playerToSend: PlayerToSend = {
      email: email
    }
    return this.http.delete(`${this.API_USERS}/user/delete`, { body: playerToSend });
  }


  addComment(comment: Review){
    return this.http.post(`${this.COMMENT_API}/create`,comment).subscribe()
  }

  getComments(){
    return this.http.get<Review[]>(`${this.COMMENT_API}/get-all`)
  }

}
