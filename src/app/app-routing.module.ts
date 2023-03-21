import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MainLayoutComponent} from "./shared/main-layout/main-layout.component";
import {AboutPageComponent} from "./non-logined/about-page/about-page.component";
import {GamePageComponent} from "./logined/game-page/game-page.component";
import {LoginPageComponent} from "./auth/login-page/login-page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterPageComponent} from "./auth/register-page/register-page.component";
import {AppComponent} from "./app.component";
const routes: Routes = [
    {path: '', component: MainLayoutComponent},
    {path: 'about', component: AboutPageComponent},

  {path: 'profile',loadChildren: () => import('./logined/login.module').then(x => x.LoginModule)}
]

@NgModule({
  imports: [RouterModule.forRoot(routes),ReactiveFormsModule,FormsModule],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
