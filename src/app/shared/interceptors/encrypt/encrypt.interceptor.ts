import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import JSEncrypt from 'jsencrypt';
import SecureLS from 'secure-ls';

@Injectable()
export class EncryptInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method === 'POST' || req.method === 'PUT') {
      const ls = new SecureLS({ encodingType: 'aes' });
      const publicKey = ls.get('key');
      if (publicKey) {
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);

        const data = encrypt.encrypt(JSON.stringify(req.body));

        if (data) {
          const clonedRequest = req.clone({
            body: { data },
          });
          return next.handle(clonedRequest);
        }
      } else {
        console.warn('Public key not found in sessionStorage.');
      }
    }

    return next.handle(req);
  }
}
