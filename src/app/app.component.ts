import { Component, computed, linkedSignal, resource, ResourceRef, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScrollableListComponent } from "./scrollable-list/scrollable-list.component";
import { QuantityInputComponent } from "./quantity-input/quantity-input.component";

export interface Product {
  id: string;
  price: number;
  title: string;
  category: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule, ScrollableListComponent, QuantityInputComponent],
  template: `
    <main class="app-container">
      <div class="card-grid">

        <!-- SECTION PRODUIT PRINCIPAL -->
        <section class="product-card">
          <header class="card-header">
            <h1>Espace Commande</h1>
            <p class="subtitle">Sélectionnez un article et ajustez vos quantités</p>
          </header>

          <div class="form-group">
            <label for="select-products">Produit</label>
            <select
              [ngModel]="selectedProduct()"
              name="select-products"
              id="select-products"
              (ngModelChange)="selectedProduct.set($event)"
              class="modern-select"
            >
              <option [ngValue]="null" disabled>-- Choisissez un produit --</option>
              @for (item of getProducts.value(); track item.id) {
                <option [ngValue]="item">{{item.title}}</option>
              }
            </select>
          </div>

          <div class="form-group">
            <label for="quantity">Quantité</label>
            @defer (on interaction; prefetch on hover) {
              <quantity-input [(quantity)]="quantity" />
            } @placeholder {
              <input type="number" [value]="quantity()" readonly class="modern-input placeholder-input" />
            }
          </div>

          <div class="summary-box">
            <p class="cart-text">{{cartText()}}</p>
            <div class="price-display">
              <span>Total :</span>
              <span class="price-value">{{price() || '0.00'}} €</span>
            </div>
          </div>

          <!-- DEFER CONDITIONNEL : Description détaillée -->
          @defer (when selectedProduct() !== null) {
            @if (selectedProduct(); as product) {
              <article class="product-details">
                <h3>À propos de ce produit</h3>
                <p>{{ product.description }}</p>
              </article>
            }
          } @placeholder {
            <div class="empty-hint">Sélectionnez un produit pour afficher sa description.</div>
          }
        </section>

        <!-- SECTION RECOMMANDATIONS (AVEC DEFER & SKELETON) -->
        <aside class="recommendations-card">
          <h2>Dans la même catégorie</h2>

          @defer (on viewport; when selectedProduct() !== null; prefetch on idle) {
            <scrollable-list [elements]="getRecommendedProducts.value() || []" />
          } @placeholder (minimum 500ms) {
            <!-- SKELETON LOADER STYLE YOUTUBE / SHIMMER -->
            <div class="skeleton-list">
              <div class="skeleton-item">
                <div class="skeleton-img"></div>
                <div class="skeleton-lines">
                  <div class="line short"></div>
                  <div class="line long"></div>
                </div>
              </div>
              <div class="skeleton-item">
                <div class="skeleton-img"></div>
                <div class="skeleton-lines">
                  <div class="line short"></div>
                  <div class="line long"></div>
                </div>
              </div>
            </div>
          } @loading (after 100ms; minimum 300ms) {
            <div class="loading-state">
              <div class="spinner"></div>
              <p>Chargement des recommandations...</p>
            </div>
          } @error {
            <p class="error-text">Impossible de charger les recommandations.</p>
          }
        </aside>

      </div>
    </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  selectedProduct: WritableSignal<Product | null> = signal(null);

  price: Signal<number> = computed(() => (this.selectedProduct()?.price || 0) * this.quantity());
  category: Signal<string | null> = computed(() => this.selectedProduct()?.category || null);

  cartText: Signal<string> = computed(() => {
    if (!this.quantity() || !this.selectedProduct()?.title) return 'Veuillez sélectionner un produit';
    return `Votre panier contient ${this.quantity()} article(s)`;
  });

  quantity: WritableSignal<number> = linkedSignal({
    source: this.selectedProduct,
    computation: () => 1
  });

  getProducts = resource({
    loader: async () => (await fetch('https://fakestoreapi.com/products')).json(),
  });

  getRecommendedProducts: ResourceRef<Product[]> = resource({
    loader: async () => {
      const cat = this.category();
      if (!cat) return [];
      return (await fetch(`https://fakestoreapi.com/products/category/${cat}`)).json();
    },
    request: () => this.category()
  });
}
 /**
  * Ce qu'on a fait :
  *

    ### 1. `quantity-input` avec interaction et survol

    Fonctionnement : `@defer (on interaction; prefetch on hover)`
    Pourquoi : Le code du composant `quantity-input` n'est téléchargé qu'au survol (grâce au prefetch) et affiché à l'interaction (clic).
    Le placeholder affiche un input neutre en attendant.

    ### 2. Bloc de description conditionnel

    Fonctionnement : `@defer (when selectedProduct() !== null)`
    Pourquoi :** Le code du bloc de description n'est ni téléchargé ni injecté dans le DOM tant qu'aucun produit n'est sélectionné.
    Contrairement à un simple `@if`, cela évite de charger du code réseau inutilement.

    ### 3. Recommandations avec conditions multiples et prefetch

    Fonctionnement : `@defer (on viewport; when selectedProduct() !== null; prefetch on idle)`
    Pourquoi :
    `prefetch on idle` : Télécharge le JavaScript en arrière-plan quand le navigateur est au repos.
    `when` + `on viewport` : Déclenche l'affichage uniquement si un produit est sélectionné ET que l'utilisateur scrolle sur l'aside.
    `@placeholder (min 500ms)` : Garantit un affichage du skeleton pendant au moins 500 ms pour éviter les effets de clignotement (flicker / CLS).
  */
