import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [AuthService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private _router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    if (
      localStorage.getItem('token') == null &&
      localStorage.getItem('key') == null
    ) {
      this._router.navigate(['login']);
    } else {
      this.auth.teste().subscribe((response) => console.log(response));
    }
  }
}
