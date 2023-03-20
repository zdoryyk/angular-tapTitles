import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { ProfileComponent } from './profile/profile.component';
import {LoginPageComponent} from "../auth/login-page/login-page.component";
import {RegisterPageComponent} from "../auth/register-page/register-page.component";
import {GamePageComponent} from "./game-page/game-page.component";


@NgModule({
  imports:[
    CommonModule,
    RouterModule.forChild([
      {
          path: '',component: ProfileLayoutComponent,children:[
          {path:'',redirectTo: '/profile/login',pathMatch:'full'},
          {path: 'login',component:LoginPageComponent},
          {path: 'register',component:RegisterPageComponent},
          {path: 'game',component:GamePageComponent}
        ]
      }
    ])
  ],
  exports:[RouterModule],
  declarations: [
    ProfileLayoutComponent,
    ProfileComponent
  ]
})
export class LoginModule{


}
