import { Injectable } from '@angular/core';
import {Player} from "../shared/interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  player: Player

  constructor(private http: HttpClient) { }

  get token(): string{
    return ''
  }

  login(player:Player): Observable<Player>{
    return this.http.post<Player>('http://localhost:8080/api/auth/login',player)
  }

  register(player: Player): Observable<Player>{
    return this.http.post<Player>('http://localhost:8080/api/auth/register',player)
  }


  isAuthenticated(): boolean{
    return false;
  }

  test():Observable<Player[]>{
    return this.http.get<Player[]>('http://localhost:8080/api/users/')
  }
}
