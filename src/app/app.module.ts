import {NgModule, Provider} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { GamePageComponent } from './logged-in/game-page/game-page.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import { AboutPageComponent } from './shared/about-page/about-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import {AuthInterceptor} from "./auth/auth.interceptor";
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import { AdminLayoutComponent } from './auth/admin/admin-layout/admin-layout.component';
import {
  FacebookLoginProvider,
  GoogleLoginProvider, GoogleSigninButtonModule,
  SocialAuthServiceConfig,
  SocialLoginModule
} from "@abacritt/angularx-social-login";

export function tokenGetter() {
  return localStorage.getItem("auth");
}
@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    GamePageComponent,
    AboutPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AdminLayoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterOutlet,
    AppRoutingModule,
    RouterLink,
    BrowserAnimationsModule,
    SocialLoginModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:8080"]
      },
    }),
    GoogleSigninButtonModule,
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi: true
  },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1015737356466-4qdcqtiu68bisb5o4lt929bahgt29e94.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  entryComponents:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
