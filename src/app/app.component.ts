import { Component, computed, effect, linkedSignal, Signal, signal, WritableSignal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { fromFetch } from 'rxjs/fetch';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface Product {
  id: string,
  price: number,
  title: string,
  category: string,
  description: string,
  image: string
}

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, FormsModule],
  template: `
      <section id="product-bloc">
        <div>
          <label for="select-products">
            Select your product
            <select 
              [ngModel]="selectedProduct()" 
              name="select-products" 
              id="select-products"
              (ngModelChange)="selectedProduct.set($event)"
            >
              @for (item of (getProducts$ | async); track item.id) {
                <option [ngValue]="item">{{item.title}}</option>
              }
            </select>
          </label>
        </div>
  
        <br>
        <label for="quantity">
          Quantity
          <input name="quantity" type="number" [ngModel]="quantity()" (ngModelChange)="quantity.set($event)">
        </label>
  
        <p>{{cartText()}}</p>
        <p>Total : {{price() || '-'}} €</p>
      </section>

      <aside id="recommendations-bloc">
        <h2>We recommand from same category</h2>

        @for (item of recommendedProducts(); track item.id) {
          <div class="cards">
            <article class="card">
              <header>
                <h3>{{ item.title }}</h3>
              </header>
              <img [src]="item?.image" [alt]="item?.description">
              <div class="content">
                <p>{{ item?.description }}</p>
              </div>
    
            </article>
          </div>
        }
      </aside>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {

  selectedProduct: WritableSignal<Product | null> = signal(null);

  recommendedProducts: WritableSignal<Product[]> = signal([]);

  /**
   * Chacun des signals ci dessous est réactif.
   * Ils se mettent à jour selon l'état / changement d'un signal de référence
   */

  price: Signal<number> = computed(() => (this.selectedProduct()?.price || 0) * this.quantity());

  category: Signal<string | null> = computed(() => this.selectedProduct()?.category || null);
  
  cartText: Signal<string> = computed(() => {
    if (!this.quantity() || !this.selectedProduct()?.title) return 'Veuillez sélectionner un produit';
    return `Votre panier contient ${this.quantity()} ${this.selectedProduct()?.title}`;
  })
  
  quantity: WritableSignal<number> = linkedSignal({
    source: this.selectedProduct,
    computation: () => 1
  });


  /**
   * HTTP call to retrieve products
   */
  getProducts$: Observable<Product[]> = fromFetch<Product[]>('https://fakestoreapi.com/products', {
    selector: res => res.json()
  });

  getRecommendations = (param: string): Observable<Product[]> => fromFetch<Product[]>(`https://fakestoreapi.com/products/category/${param}`, {
    selector: res => res.json()
  });

  constructor() {

    // Effect permettant de mettre à jour la liste des recommendations à chaque changement de categorie

    effect(() => {
      const category = this.category()

      category && this.getRecommendations(category)
      .pipe(tap(products => this.recommendedProducts.set(products)))
      .subscribe()
    })

  }
  
}
