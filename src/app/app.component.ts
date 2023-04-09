import {Component, OnInit} from "@angular/core";
import {animate, AnimationEvent, keyframes, state, style, transition, trigger} from "@angular/animations";
import {Player} from "./shared/interfaces";
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";
import {ProfileComponent} from "./logged-in/profile/profile.component";
import {tap} from "rxjs";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[trigger('tapTitleTrigger', [
    transition(':enter', [
      style({
        transform: 'scale(0.8)',
        opacity: 0
      }),
      animate('0.2s ease-out', style({
        transform: 'scale(1)',
        opacity: 1
      }))
    ]),
    transition(':leave', [
      style({
        transform: 'scale(1)',
        opacity: 1
      }),
      animate('0.2s ease-out', style({
        transform: 'scale(0.8)',
        opacity: 0
      }))
    ])
  ])],
})
export class AppComponent implements OnInit{

  shimmer = 'enter'
  isAuthed = false;

  ngOnInit(): void  {

  }

  Auth():boolean{
    return this.isAuthed = !this.isAuthed
  }
  user: Player
  constructor(public auth: AuthService, public router: Router) {

  }

  async logout($event: Event) {
    await $event.preventDefault()
    await this.auth.logout()
    await this.router.navigate(['/profile/login'])
  }
}
