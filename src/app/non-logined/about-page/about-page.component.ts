import { Component } from '@angular/core';
import {ApiService} from "../../auth/api.service";

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent {


  constructor(private api: ApiService) {

  }


  getPeople() {
    this.api.test().subscribe(response =>{
      console.log(response)
    })
  }
}
