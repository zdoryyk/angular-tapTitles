import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../logged-in/api.service";
import {Router} from "@angular/router";
import {Player} from "../../../shared/interfaces";
import {LinkService} from "../../../shared/link.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit{

  users: Player[] = []

  constructor(private api: ApiService, public router: Router,private linkService: LinkService) {

  }


  getAllUsers(){
    this.api.getAllUsers().subscribe(response =>{
      this.users = response.filter(x => x.username != 'FERIPE')
    })
  }

  ngOnInit(): void {
    this.getAllUsers()
  }

  goToUser(id: number,email: string) {
    this.linkService.addUser(email)
    this.router.navigate(['/admin/user/', id]);
  }

  async deleteUser(email: string){
    let res = await firstValueFrom(this.api.deleteUser(email))
    if(res === 'OK'){
      this.getAllUsers()
    }
  }
}
