// src/app/core/interceptors/api-prefix.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // leave absolute URLs alone
    if (/^https?:\/\//i.test(req.url)) return next.handle(req);

    // prefix relative URLs with environment.apiBase
    const url = environment.apiUrl.replace(/\/+$/, '') + '/' + req.url.replace(/^\/+/, '');
    return next.handle(req.clone({ url }));
  }
}
