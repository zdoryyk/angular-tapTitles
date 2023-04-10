import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {GameApiService} from "../../logged-in/game-page/game-api.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit{

  rating: any
  scores: any
  constructor(private authService: AuthService,private gameApi: GameApiService) {

  }
   async ngOnInit() {

     this.rating = await firstValueFrom(this.gameApi.getSortedRating())
     this.rating = this.rating.slice(0.5)

     this.scores = await firstValueFrom(this.gameApi.getSortedScores())
     this.scores = this.scores.slice(0,5)
  }

}
