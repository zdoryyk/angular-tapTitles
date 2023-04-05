import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Comment, Player, Rating, Score} from "../../shared/interfaces";
import {ApiService} from "../api.service";
import {Router} from "@angular/router";
import {LinkService} from "../../shared/link.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  user: Player = {
    username: '',
    email: '',
    password: '',
    created_on: new Date(),
    isAdmin: false
  }
  scores: Score[] = []
  rating: Rating
  comments: Comment[] = []


  constructor(private authService:AuthService,
              private apiService: ApiService,
              private router: Router,
              private linkService: LinkService) {

  }

  ngOnInit(): void {
    this.setPlayer()
  }

   setPlayer() {
    const obj = this.authService._decodedToken$()
     const email = obj.email!
    this.apiService.getUserByEmail(email).subscribe((response:any) => {
      this.user = response
      this.scores = response.scores
      this.rating = response.rating
      this.comments = response.commentList
      if(response.role == 'ROLE_ADMIN'){
        this.user.isAdmin = true
      }
    })
  }


  routeToAdminPage() {
    this.router.navigate(['admin'])
  }

  routeToLogin() {
    this.router.navigate(['/profile/login'])
  }
}
