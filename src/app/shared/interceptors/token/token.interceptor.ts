import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import SecureLS from 'secure-ls';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const ls = new SecureLS({ encodingType: 'aes' });

    const token: string = ls.get('token');
    let requestRetorno: HttpRequest<any>;

    if (token) {
      requestRetorno = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
    } else {
      requestRetorno = req.clone();
    }
    return next.handle(requestRetorno);
  }
}
