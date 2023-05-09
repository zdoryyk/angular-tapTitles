import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PlayerToSend, Rating, Score, ScoreToSend, Tile} from "../../shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class GameApiService {

  private readonly gameUrl = 'http://localhost:8080/api/game'
  private readonly scoreUrl = 'http://localhost:8080/api/scores'
  private readonly ratingUrl = 'http://localhost:8080/api/rating'

  constructor(private http: HttpClient) { }


  putTilesBack(tileArray:Tile[]):Observable<any>{
    return this.http.put(`${this.gameUrl}/return-tile`,tileArray)
  }


  getBoard(columns: number,rows: number): Observable<string[][]>{
    const toSend = {
      'columns': columns,
      'rows': rows
    }
    return this.http.post<string[][]>(`${this.gameUrl}/generate`,toSend)
  }

   postHandleInput(tileArray:Tile[]):Observable<any>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

     return this.http.post(`${this.gameUrl}/handle-input`, tileArray, {headers});
  }

  postScore(score: ScoreToSend){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.scoreUrl}/add-score`,score,{headers})
  }

  getUserScores(user: PlayerToSend):Observable<Score[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post<Score[]>(`${this.scoreUrl}/user-score`,user,{headers})
  }

  postReplayedArray(array: string[][]):Observable<any>{
    const wrapper = { array: array };
    return this.http.post(`${this.gameUrl}/regenerate-field`,wrapper)
  }

  getSortedRating():Observable<any>{
    return this.http.get(`${this.ratingUrl}/sort-rating`)
  }

  getSortedScores():Observable<any>{
    return this.http.get(`${this.scoreUrl}/sort-score`)
  }

  putSavedGame(array: string[][],id: number,score: number,level: number):Observable<any>{
    const toSend = {array,id,score,level};
    return this.http.put(`${this.gameUrl}/save-game`,toSend)
  }

  getSavedGame(id: number):Observable<any>{
      return this.http.get<any>(`${this.gameUrl}/saved-game-${id}`)
  }

  deleteLastGame(id: number):Observable<any>{
      return this.http.delete(`${this.gameUrl}/delete-game-${id}`)
  }

}
