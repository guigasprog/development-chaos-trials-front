import { AuthService } from './../../shared/services/auth/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenKeyDTO } from './shared/models/response/token-key.dto';
import { LoginForm } from './shared/models/forms/login.form';
import SecureLS from 'secure-ls';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  myForm: FormGroup;

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.myForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  logar() {
    const ls = new SecureLS({ encodingType: 'aes' });
    ls.clear();
    if (
      this.myForm.get('username')?.value &&
      this.myForm.get('password')?.value
    ) {
      var form = new LoginForm();
      form = this.myForm.value;

      this.authService.login(form).subscribe(
        (success: TokenKeyDTO) => {
          ls.set('key', success.key);
          ls.set('token', success.token);
        },
        (error) => console.log(error)
      );

      // this._router.navigate(['/inicio']);
    }
  }
}
