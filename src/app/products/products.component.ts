import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  #router = inject(Router);

  products = signal([
    {
      id: "001",
      name: 'Zelige table',
      type: 'mobilier',
      price: 530
    },
    {
      id: "001",
      name: 'Zelige table',
      type: 'mobilier',
      price: 530
    },
    {
      id: "002",
      name: 'Service ceramique Fès',
      type: 'art de la table',
      price: 100
    },
    {
      id: "003",
      name: 'Jellaba berbère',
      type: 'mode sur mesure',
      price: 90
    },
    {
      id: "002",
      name: 'Service ceramique Fès',
      type: 'art de la table',
      price: 100
    },
  ])

  selectedProduct = signal(this.products().at(0));

  checkProduct(id: string) {
    this.#router.navigate([], { queryParams: {productId: id}, fragment: "detail" });
  }

}
