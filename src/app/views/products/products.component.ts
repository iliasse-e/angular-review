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
      name: 'Zelige table carré',
      type: 'mobilier',
      description: "Table en acier forgé, incrusté d'une plaque de zelige andalou faite à la main",
      price: 530
    },
    {
      id: "011",
      name: 'Tapis sanhaji',
      type: 'décoration',
      description: "Fabriqué dans une coopérative de femme d'une tribu berbère de la région de l'Ourika",
      price: 210
    },
    {
      id: "002",
      name: 'Service ceramique Fès',
      type: 'art de la table',
      description: "Céramique de table dans la pure tradition raffinée de Fès",
      price: 100
    },
    {
      id: "003",
      name: 'Jellaba berbère',
      type: 'mode sur mesure',
      description: "Jellaba d'hiver, faite selon la tradition de Ouzzane, 100% fait main",
      price: 90
    },
    {
      id: "005",
      name: 'Lanterne en fer forgé',
      type: 'décoration maison',
      description: "Fabriqué dans dans le quartier de Saffarine à Fès, cet objet apporte une ambiance secrète à votre intérieur",
      price: 10
    },
  ])

  selectedProduct = signal(this.products().at(0));

  checkProduct(id: string) {
    this.selectedProduct.set(this.products().find(p => p.id == id));
    this.#router.navigate([], { queryParams: {productId: id}, fragment: "detail" });
  }

}
