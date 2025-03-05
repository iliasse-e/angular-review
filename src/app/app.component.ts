import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

export interface Product {
  id: string,
  price: number,
  title: string,
  category: string,
  description: string,
  image: string
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
  <nav>
    <ul>
      <li><a routerLink="" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a></li>
      <li><a routerLink="products" routerLinkActive="active">Products</a></li>
      <li><a routerLink="my-profile" routerLinkActive="active">My profile</a></li>
    </ul>
  </nav>
  <router-outlet />
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {


  
}
