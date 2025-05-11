import { Component, inject, Injectable, OnInit } from '@angular/core';
import { interval, Observable, Subscription, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Product {
  id: string,
  price: number,
  title: string,
  category: string,
  description: string,
  image: string
}

@Injectable({
  providedIn: 'root',
})
class ProductRepository {
  #httpClient = inject(HttpClient);
  getProduct$: Observable<Product> = interval(3000).pipe(
    switchMap(() => this.#httpClient.get<Product>('https://fakestoreapi.com/products/' + Math.round(Math.random() * 10)))
  );
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  providers: [ProductRepository],
  template: `
      <aside id="recommendations-bloc">
        <h2>We recommand from same category</h2>

        @if (product) {
          <div class="cards">
            <article class="card">
              <header>
                <h3>{{ product.title }}</h3>
              </header>
              <img [src]="product.image" [alt]="product.description">
              <div class="content">
                <p>{{ product.description }}</p>
              </div>
    
            </article>
          </div>
        }
      </aside>
      <button type="button" (click)="stopStream()">Unsubscribe</button>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  #productRepository = inject(ProductRepository);

  product: Product | null = null;

  productSubscription = new Subscription();

  ngOnInit(): void {
    this.productSubscription = this.#productRepository.getProduct$.subscribe(p => this.product = p);
  }

  stopStream() {
    this.productSubscription.unsubscribe();
  }
}

