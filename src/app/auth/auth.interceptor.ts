import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    request = request.clone({
      headers: request.headers.set('Authorization',`Bearer ${this.authService.token}`)
    })

    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401 || error.status === 403 || error.status === 500 ) {
          // Token expired, clear local storage and reload page
          localStorage.removeItem('auth');
          this.authService.logout()
        }
        return throwError(error);
      })
    );
  }
}
