import {NgModule} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {RouterModule} from "@angular/router";
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { ProfileComponent } from './profile/profile.component';
import {LoginPageComponent} from "../auth/login-page/login-page.component";
import {RegisterPageComponent} from "../auth/register-page/register-page.component";
import {GamePageComponent} from "./game-page/game-page.component";
import {IsAuthenticatedGuard} from "../auth/is-authenticated.guard";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminLayoutComponent} from "../auth/admin/admin-layout/admin-layout.component";
import {RoleGuard} from "../auth/role.guard";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: ProfileLayoutComponent, children: [
          {path: '', component: ProfileComponent, canActivate: [IsAuthenticatedGuard]},
          {path: 'login', component: LoginPageComponent},
          {path: 'register', component: RegisterPageComponent},
          {path: 'game', component: GamePageComponent, canActivate: [IsAuthenticatedGuard]},
        ]
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  exports:[RouterModule],
  declarations: [
    ProfileLayoutComponent,
    ProfileComponent,
  ],
  providers:[]
})
export class LoginModule{


}
