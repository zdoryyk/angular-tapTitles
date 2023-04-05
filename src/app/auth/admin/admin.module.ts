import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {AdminLayoutComponent} from "./admin-layout/admin-layout.component";
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminPageExtraComponent } from './admin-page-extra/admin-page-extra.component';
import {RoleGuard} from "../role.guard";



@NgModule({
  declarations: [
    AdminPageComponent,
    AdminPageExtraComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent,canActivate:[RoleGuard],children:[
          {path:'',redirectTo:'/admin/dashboard',pathMatch:'full'},
          {path: 'dashboard',component: AdminPageComponent},
          {path: 'user/:id',component:AdminPageExtraComponent}
        ]
      }])
  ]
})
export class AdminModule { }
