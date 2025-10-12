import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const isAbsolute = /^https?:\/\//i.test(req.url);
    const url = isAbsolute ? req.url : `${environment.apiUrl}/${req.url}`;
    return next.handle(req.clone({ url }));
  }
}
