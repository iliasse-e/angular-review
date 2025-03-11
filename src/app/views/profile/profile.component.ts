import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IsDirty } from '../../is-not-dirty.guard';

@Component({
  selector: 'app-profile',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <h2>profile page</h2>

    <button><a routerLink="informations" routerLinkActive="active">Check my profile</a></button>
    <button><a routerLink="child-a" routerLinkActive="active">Check child A</a></button>
    <button><a routerLink="child-b" routerLinkActive="active">Check child B</a></button>

    <router-outlet />
  `,
})
export class ProfileComponent {

}

@Component({
  selector: 'child-a',
  imports: [ReactiveFormsModule],
  template: `
    <h2>child A</h2>

    <label for="control">Search : </label>
    <input id="control" type="text" [formControl]="control">
    <p>Search input has to be filled in order to be allowed to leave the route</p>
  `,
})
export class ChildA implements IsDirty {

  control = inject(FormBuilder).control('');

  isDirty(): boolean {
    return this.control.dirty;
  }

}

@Component({
  selector: 'child-b',
  template: `
    <h2>child B</h2>
  `,
})
export class ChildB {

}
