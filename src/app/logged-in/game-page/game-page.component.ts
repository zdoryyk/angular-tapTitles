import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {GameApiService} from "./game-api.service";
import {GameService} from "./game.service";
import { Score, ScoreToSend, Tile, Tiles} from "../../shared/interfaces";
import {firstValueFrom} from "rxjs";
import {LinkService} from "../../shared/link.service";
import {
  animationRow,
  animationTile,
  deleteAnimation,
  scoreAnimation,
  zoomAnimation
} from "../../shared/animations";



@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
  animations:[animationTile,animationRow,scoreAnimation,deleteAnimation,zoomAnimation]
})
export class GamePageComponent implements OnInit{

  private readonly $id:number
  private columns:number
  private rows:number
  level:number = 1
  tempArray: string[][] = []
  board: Tile[][] = []
  steps: Tile[] = []
  scoreSteps: number[] = []
  score: number = 0
  scores: Score[]= []
  animationState:string = 'animateTrue'
  temp: number = -1
  replayedGame = false
  showGameUtils = true

  constructor(private api: GameApiService, private service: GameService,private linkService: LinkService) {
    this.$id = this.linkService.returnUsersId()
  }

  async ngOnInit() {
    await this.getBoard(4,4)
    this.getScores().then()
  }

   async getInput(){

    if(this.board.flat()
      .reduce((count, tile) => count + (tile.activated ? 1 : 0), 0) < 2)return

      const activatedTiles = this.board
        .flatMap(row => row.filter(tile => tile.activated))
        .filter(Boolean);

      let tiles: Tiles = {
        firstTile: activatedTiles[0],
        secondTile: activatedTiles[1]
      }

      if(tiles.firstTile.value != tiles.secondTile.value){
        this.board.map(x => x.map( y => y.activated = false))
        return
      }
      this.board.forEach(row => row.forEach(cell => {cell.activated = false; cell.highlighted = false;}));

      let response = await this.service.postHandleInput(tiles)
      this.service.boardService(this.board,tiles,response,this.steps)
      this.temp = this.score
      this.score = this.service.scoreRecorded(this.score,this.scoreSteps,response)

      if(this.score > this.temp){
        this.changeValue('animateTrue')
      }else if(this.score  < this.temp){
        this.changeValue('animateFalse')
      }

      if(!this.service.isGameActive(this.board)){
        if(this.replayedGame){
          await this.deleteLastGame()
        }
        let scoreToSend:ScoreToSend = {
          user_id: this.$id,
          points: this.score
        }
        await firstValueFrom(this.service.sendScores(scoreToSend))
        await this.getScores()
        await this.getLevel(this.level + 1)
    }
  }

  async getBoard(columns: number,rows: number) {

    this.columns = columns
    this.rows = rows
    this.board = []
    this.steps = []
    this.scoreSteps = []

    if (!this.replayedGame) {
      let hello = await firstValueFrom(this.api.getSavedGame(this.$id))
      if (hello != null) {
        let tmp = hello.array

        if (tmp != null) {
            this.showGameUtils = false
            this.replayedGame = true
            this.columns = tmp[0].length;
            this.rows = tmp.length;
            this.tempArray = tmp
            await this.onReplay()
            this.score = await hello.score
            this.level = await hello.level
        }
      } else {
            this.api.getBoard(columns, rows).subscribe((response: string[][]) => {
            this.tempArray = response
            this.initBoard()
        })
      }
    }else {
          this.api.getBoard(columns, rows).subscribe((response: string[][]) => {
          this.tempArray = response
          this.initBoard()
      })
    }
  }


   async getScores() {
    this.scores = await this.service.getUserScores(this.$id)
  }


  async onUndo(){
    if(this.steps.length) {

        let tiles:Tiles = {firstTile:this.steps[0], secondTile:this.steps[1]}

        let response = await this.service.returnTiles(tiles)

        if(response) {
          this.board[this.steps[0].x!][this.steps[0].y!] = {...this.steps[0]}
          this.board[this.steps[1].x!][this.steps[1].y!] = {...this.steps[1]}
          this.scoreSteps.shift()
          this.score = this.scoreSteps[0]
          this.steps.shift()
          this.steps.shift()
        }
    }
    if(!this.scoreSteps.length){
      this.score = 0
    }
  }

   async onReplay(){
      this.steps = []
      this.scoreSteps = []
      await this.service.regenerateField(this.tempArray)
      this.initBoard()
   }


  async onSave() {
    this.service.saveGame(this.board,this.$id,this.score,this.level)
  }

  async getLevel(level: number){

    this.level = level
    this.showGameUtils = true
    switch (level){
      case 1: await this.getBoard(4, 4)
        break
      case 2: await this.getBoard(6, 6)
        break
      case 3: await this.getBoard(8, 8)
        break
      case 4: await this.getBoard(8, 12)
        break
      case 5: await this.getBoard(8, 17)
        break
      default: await this.getBoard(8, 17)
    }
  }

  onMouseOver(tile: Tile) {
    tile.highlighted = true;
    console.log(tile)
    this.board.flat().flatMap(x => x.value == tile.value ? x.highlighted = true: false)
  }

  onMouseLeave(tile: Tile) {
    tile.highlighted = false;
    this.board.flat().flatMap(x => x.value == tile.value ? x.highlighted = false: false)
  }

  onMouseDown(tile: Tile) {
    tile.activated = !tile.activated
    this.getInput().finally()
  }

  initBoard(){
    for(let i = 0; i < this.columns; i++){
      this.board[i] = [];
      for(let j = 0; j < this.rows; j++){
        this.board[i][j] = { value: '', highlighted: false,activated: false,color: ''};
      }
    }
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.board[i][j] = {
          value: this.tempArray[i][j],
          highlighted: false,
          activated: false, color: this.getColor(this.tempArray[i][j]),
          disabled:false,
          x: i, y: j
        };
        if(this.board[i][j].value == ' '){
            this.board[i][j].disabled = true
        }
      }
    }
    this.score = 0;
  }

  changeValue(state: string) {
    this.animationState = state
    setTimeout(() => {
      this.animationState = 'normal'
    }, 1000);
  }


  private getColor(value: string): string {

    const colors: string[] = ['green', 'blue', 'yellow','#BC6400','purple','pink','black'];

    if(value === '1' || value == 'i' || value ==='D' || value === 'P')return 'blue'
    if(value === 'M' || value === 'X')return 'darkblue'
    if(value === 'S' || value === 'E' || value === '3' || value === 'B')return '#BC6400'
    if(value === 'U' || value === 'A' || value === 'G') return '#AC6200'
    if(value === 'W' || value === '7' || value === 'K' || value === 'R' || value === 'Q' || value === 'T') return '#AC009B'
    if(value === '6' || value === '9') return '#BF3CFF'
    if(value === 'C' || value === 'Z') return '#B70087'
    if(value === 'F' ||value === '5' || value === 'Y' || value === 'L' || value === '8' || value === '2' ) return '#0B6900'
    if(value === 'J') return '#A86A00'
    if(value === 'N') return '#FF57EF'
    if(value == 'H' || value === '4' || value === 'O') return '#660033'
    return 'black'
  }

  getWindow() {
    const styles: any = {};

    if (this.level == 1 || this.level == 2) {
      styles['width'] = '100px';
      styles['height'] = '100px';
    } else if (this.level == 3) {
      styles['width'] = '80px';
      styles['height'] = '80px';
    } else if(this.level == 4 || this.level == 5) {
      styles['width'] = '70px';
      styles['height'] = '70px';
    }
    return styles;
  }

  getTileStyles(tile: any): any {
    const styles: any = {};

    if (tile.activated) {
      styles['background-color'] = '#FF5C5C';
    } else if (tile.highlighted) {
      styles['background-color'] = '#FF9999';
    } else {
      styles['background-color'] = null;
    }

    if (tile.color) {
      styles['color'] = tile.color;
    }

    return styles;
  }

  async deleteLastGame(){
    await this.api.deleteLastGame(this.$id).subscribe(x => {})
    this.replayedGame = false
  }

}
