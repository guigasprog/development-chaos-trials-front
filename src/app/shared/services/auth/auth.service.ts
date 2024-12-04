import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenKeyDTO } from '../../../pages/login-page/shared/models/response/token-key.dto';
import { LoginForm } from '../../../pages/login-page/shared/models/forms/login.form';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = '/auth'; // Substitua pelo URL da sua API

  constructor(private http: HttpClient) {}

  login(loginForm: LoginForm): Observable<TokenKeyDTO> {
    return this.http.post<TokenKeyDTO>(`${this.api}/login`, loginForm);
  }

  register(registerForm: {
    email: string;
    username: string;
    password: string;
  }): Observable<TokenKeyDTO> {
    return this.http.post<TokenKeyDTO>(`${this.api}/register`, registerForm);
  }

  teste(): Observable<string> {
    return this.http.get<string>(`${this.api}/teste`);
  }
}
