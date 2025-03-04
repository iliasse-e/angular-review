import { Component, computed, effect, linkedSignal, resource, ResourceRef, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScrollableListComponent } from "./scrollable-list/scrollable-list.component";
import { QuantityInputComponent } from "./quantity-input/quantity-input.component";

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
  imports: [FormsModule, ScrollableListComponent, QuantityInputComponent],
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
              @for (item of getProducts.value(); track item.id) {
                <option [ngValue]="item">{{item.title}}</option>
              }
            </select>
          </label>
        </div>
  
        <br>
        <label for="quantity">
          Quantity
          <quantity-input [(quantity)]="quantity" />
        </label>
  
        <p>{{cartText()}}</p>
        <p>Total : {{price() || '-'}} €</p>
      </section>

      <aside id="recommendations-bloc">
        @if (getRecommendedProducts.hasValue()) {
          <h2>We recommand from same category</h2>
          <scrollable-list [elements]="getRecommendedProducts.value() || []" />
        }
      </aside>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {

  selectedProduct: WritableSignal<Product | null> = signal(null);

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
  getProducts = resource({
    loader: async () => (await fetch('https://fakestoreapi.com/products')).json(),
  })

  getRecommendedProducts: ResourceRef<Product[] | undefined> = resource({
    request: () => ({category: this.category()}),
    loader: async ({request: {category}}): Promise<Product[] | undefined> => {
      if (category) return (await fetch(`https://fakestoreapi.com/products/category/${category}`)).json()
      else return;
      },
  })

  constructor() {
    effect(() => {
      console.log({
        value: this.getRecommendedProducts.value(),
        error: this.getRecommendedProducts.error(),
        isLoading: this.getRecommendedProducts.isLoading(),
        status: this.getRecommendedProducts.status()
      });
      
    })
  }
  
}
