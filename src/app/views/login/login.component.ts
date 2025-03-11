import { Component, effect, inject, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-login',
  imports: [],
  template: `
    <p>login page</p>
    <button (click)="login()">Login</button>
  `,
})
export class LoginComponent {
  #router = inject(Router);
  #loginService = inject(LoginService);

  isLoggedIn: Signal<boolean> = this.#loginService.isLoggedIn.asReadonly();

  navigateToProfilePage() {
    this.#router.navigateByUrl('/my-profile');
  }

  login(): void {
    this.#loginService.login();
  }

  constructor() {
    effect(() => {
      this.isLoggedIn() && this.navigateToProfilePage();
    })
  }
}
