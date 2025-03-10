import { Component, inject, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../app.component';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <p>home page</p>
    @if(isLoggedIn()) {
      <button (click)="logout()">Logout</button>
    } @else {
      <button (click)="navigateToLoginPage()">Login</button>
    }

  `,
})
export class HomeComponent {
  #router = inject(Router);
  #loginService = inject(LoginService);

  isLoggedIn: Signal<boolean> = this.#loginService.isLoggedIn.asReadonly();

  navigateToLoginPage() {
    this.#router.navigateByUrl('/login');
  }

  logout(): void {
    this.#loginService.logout()
  }
}
