import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './app.component';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(LoginService).isLoggedIn() ? true : inject(Router).parseUrl('forbidden');
};
