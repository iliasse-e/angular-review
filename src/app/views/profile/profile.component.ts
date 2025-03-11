import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <h2>profile page</h2>

    <button><a routerLink="informations" routerLinkActive="active">Check my profile</a></button>
    <button><a routerLink="child-a" routerLinkActive="active">Check child A</a></button>
    <button><a routerLink="child-b" routerLinkActive="active">Check child</a></button>

    <router-outlet />
  `,
})
export class ProfileComponent {

}

@Component({
  selector: 'child-a',
  template: `
    <h2>child A</h2>
  `,
})
export class ChildA {

}

@Component({
  selector: 'child-b',
  template: `
    <h2>child B</h2>
  `,
})
export class ChildB {

}
