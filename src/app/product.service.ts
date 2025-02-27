import { computed, Injectable, resource, ResourceRef, Signal, signal, WritableSignal } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  selectedProduct: WritableSignal<Product | null> = signal(null);

  category: Signal<string | null> = computed(() => this.selectedProduct()?.category || null);

  /**
   * HTTP call to retrieve products
   */
  getProducts = resource({
    loader: async () => (await fetch('https://fakestoreapi.com/products')).json(),
  })

  /**
   * HTTP call reactif à un signal
   */
  getRecommendedProducts: ResourceRef<Product[]> = resource({
    loader: async () => (await fetch(`https://fakestoreapi.com/products/category/${this.category()}`)).json(),
    request: () => this.category()
  })
}
