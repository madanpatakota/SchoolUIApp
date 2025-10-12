import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    return token
      ? next.handle(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }))
      : next.handle(req);
  }
}
