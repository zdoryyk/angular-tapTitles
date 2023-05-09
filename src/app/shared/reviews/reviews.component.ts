import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../logged-in/api.service";
import {Review} from "../interfaces";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit{

   reviews: Review[]

  async ngOnInit() {
    this.reviews = await firstValueFrom(this.api.getComments())
    this.reviews = this.reviews.reverse()
  }


  constructor(public api: ApiService) {
  }




  async addComment(nameAuthor: string, text: string) {
    if(nameAuthor == '' || text === ''){
      return
    }
    let comment: Review = {
      name:nameAuthor,
      comment:text
    }
    this.reviews.unshift(comment)
    await this.api.addComment(comment)

  }
}
