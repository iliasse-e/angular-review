import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'forbidden',
  imports: [RouterLink],
  template: `
    <h3>Forbidden</h3>
    <button><a routerLink="/home">Back to home page</a></button>

    <hr>
    <p>You're not logged</p>
  `,
})
export class ForbiddenComponent {

}
