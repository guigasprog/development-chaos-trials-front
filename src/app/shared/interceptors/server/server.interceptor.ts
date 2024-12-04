import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServidorInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let requestRetorno: HttpRequest<any>;

    if (!req.url.startsWith('http')) {
      requestRetorno = req.clone({
        url: 'http://localhost:8080' + req.url,
      });
    } else {
      requestRetorno = req.clone({ url: req.url });
    }

    return next.handle(requestRetorno);
  }
}
