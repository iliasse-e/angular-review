import { Component, computed, inject, linkedSignal, Signal, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { fromFetch } from 'rxjs/fetch';
import { FormsModule } from '@angular/forms';

interface Product {
  id: string,
  price: number,
  title: string,
  category: string,
  description: string,
}

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, FormsModule],
  template: `
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
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {

  selectedProduct: WritableSignal<Product | null> = signal(null);

  /**
   * Chacun des signals ci dessous est réactif.
   * Ils se mettent à jour selon l'état / changement d'un signal de référence
   */

  price: Signal<number> = computed(() => (this.selectedProduct()?.price || 0) * this.quantity() );
  
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
  
}
