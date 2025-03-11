import { Injectable, signal } from "@angular/core";

@Injectable({providedIn: 'root'})
export class LoginService {

  isLoggedIn = signal(false);

  login(): void {
    setTimeout(() => this.isLoggedIn.set(true), 500)
  }

  logout(): void {
    setTimeout(() => this.isLoggedIn.set(false), 500)
  }
}