import {Component, Input, OnInit} from '@angular/core';
import {Comment, Player, Rating, Score} from "../../../shared/interfaces";
import {AuthService} from "../../auth.service";
import {ApiService} from "../../../logged-in/api.service";
import {Router} from "@angular/router";
import {LinkService} from "../../../shared/link.service";
import {logCumulativeDurations} from "@angular-devkit/build-angular/src/builders/browser-esbuild/profiling";




@Component({
  selector: 'app-admin-page-extra',
  templateUrl: './admin-page-extra.component.html',
  styleUrls: ['./admin-page-extra.component.scss']
})
export class AdminPageExtraComponent implements OnInit{

  user: Player = {
    id:  0,
    username: '',
    email: '',
    password: '',
    created_on: new Date(),
    isAdmin: false
  }

  scores: Score[] = []
  rating: Rating
  comments: Comment[] = []


  constructor(private authService:AuthService,private apiService: ApiService,private router: Router,private linkService: LinkService) {

  }



  ngOnInit(): void {
    this.setPlayer()
  }


  setPlayer() {
    this.apiService.getUserByEmail(this.linkService.returnUser()).subscribe((response:any) => {
      this.user = response
      this.scores = response.scores
      this.rating = response.rating
      this.comments = response.commentList
      if(response.role == 'ROLE_ADMIN'){
        this.user.isAdmin = true
      }
    })
  }

}
