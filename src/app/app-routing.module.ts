import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MainLayoutComponent} from "./shared/main-layout/main-layout.component";
import {AboutPageComponent} from "./shared/about-page/about-page.component";
import {GamePageComponent} from "./logged-in/game-page/game-page.component";
import {LoginPageComponent} from "./auth/login-page/login-page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterPageComponent} from "./auth/register-page/register-page.component";
import {AppComponent} from "./app.component";
import {ProfileComponent} from "./logged-in/profile/profile.component";
const routes: Routes = [
    {path: '', component: MainLayoutComponent},
    {path: 'about', component: AboutPageComponent},

  {path: 'profile',loadChildren: () => import('./logged-in/login.module').then(x => x.LoginModule)},
  {path: 'admin',loadChildren: () => import('./auth/admin/admin.module').then(x => x.AdminModule)}
]

@NgModule({
  imports: [RouterModule.forRoot(routes),ReactiveFormsModule,FormsModule],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
