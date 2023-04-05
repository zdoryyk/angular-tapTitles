import {Injectable} from '@angular/core';
import {GameApiService} from "./game-api.service";
import {PlayerToSend, Score, ScoreToSend, Tile, Tiles} from "../../shared/interfaces";
import {firstValueFrom, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private api: GameApiService) { }


    boardService(board: Tile[][], tiles: Tiles, response: boolean, steps: Tile[]) {

     if (response) {
       steps.unshift({...tiles.firstTile}, {...tiles.secondTile})
       board[tiles.firstTile.x!][tiles.firstTile.y!].value = ' '
       board[tiles.secondTile.x!][tiles.secondTile.y!].value = ' '
       board[tiles.firstTile.x!][tiles.firstTile.y!].disabled = true
       board[tiles.secondTile.x!][tiles.secondTile.y!].disabled = true
     }
   }

  scoreRecorded(score: number,scores:number[],step: boolean):number{
       if(step){
         if(score == 0){
           score = 3;
         }else{
          score*= 1.5
         }
          scores.unshift(score)
       }else if(!step){
         score-= 0.5
       }
       if(score <= 0)score = 0;

    return score
  }

  async returnTiles(tiles: Tiles):Promise<boolean>{
    const res = await firstValueFrom(this.api.putTilesBack([tiles.firstTile, tiles.secondTile]))
    return res.message === 'OK'
  }

  async postHandleInput(tiles: Tiles):Promise<boolean>{
    const res = await firstValueFrom(this.api.postHandleInput([tiles.firstTile, tiles.secondTile]))
    return res.message === 'OK'
    }

    sendScores(score: ScoreToSend):Observable<any>{
        return this.api.postScore(score)
    }

    async getUserScores(id: number):Promise<any>{
      let user: PlayerToSend = {
        id: id
      }
      return await firstValueFrom(this.api.getUserScores(user))
    }

    isGameActive(board: Tile[][]): boolean{
        for(let i = 0; i < board.length; i++){
          for(let j = 0; j < board.length; j++){
            if(board[i][j].value != ' ')return true
          }
        }
        return false
    }

}
