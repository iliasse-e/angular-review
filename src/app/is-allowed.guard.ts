import { inject } from '@angular/core';
import { CanActivateChildFn, RedirectCommand, Router } from '@angular/router';

export const isAllowedGuard: CanActivateChildFn = async (childRoute, state) => {
  const router = inject(Router);
  const url = "https://yesno.wtf/api";
  const { answer } = await (await fetch(url)).json()
  console.log(answer);
  
  return answer === 'yes' 
    ? true
    : new RedirectCommand(router.parseUrl("/home"));
};

