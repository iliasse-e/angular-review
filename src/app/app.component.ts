import { Component, computed, inject, linkedSignal, ResourceRef, Signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScrollableListComponent } from "./scrollable-list/scrollable-list.component";
import { QuantityInputComponent } from "./quantity-input/quantity-input.component";
import { ProductService } from './product.service';
import { Product } from './product.model';

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
        <h2>We recommand from same category</h2>
        <scrollable-list [elements]="getRecommendedProducts.value()" />
      </aside>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {

  #productService = inject(ProductService);

  selectedProduct: WritableSignal<Product | null> = this.#productService.selectedProduct;

  /**
   * Chacun des signals ci dessous est réactif.
   * Ils se mettent à jour selon l'état / changement d'un signal de référence
   */

  price: Signal<number> = computed(() => (this.selectedProduct()?.price || 0) * this.quantity());

  category: Signal<string | null> = this.#productService.category;
  
  cartText: Signal<string> = computed(() => {
    if (!this.quantity() || !this.selectedProduct()?.title) return 'Veuillez sélectionner un produit';
    return `Votre panier contient ${this.quantity()} ${this.selectedProduct()?.title}`;
  })
  
  quantity: WritableSignal<number> = linkedSignal({
    source: this.selectedProduct,
    computation: () => 1
  });


  getProducts = this.#productService.getProducts;

  getRecommendedProducts: ResourceRef<Product[]> = this.#productService.getRecommendedProducts;
  
}
