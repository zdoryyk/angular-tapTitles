import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MainLayoutComponent} from "./shared/main-layout/main-layout.component";
import {AboutPageComponent} from "./shared/about-page/about-page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomePageComponent} from "./shared/home-page/home-page.component";



const routes: Routes = [
    {path: '', component: MainLayoutComponent,children: [{
        path: '', component: HomePageComponent,pathMatch:'full'
      }]},
    {path: 'rating', component: AboutPageComponent},

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
