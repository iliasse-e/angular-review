import { Component, inject, input, signal, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../../app.component';

@Component({
  selector: 'app-detail',
  imports: [],
  template: `
    <h3>Detail product {{id()}}</h3>

    <h5>{{product()?.title}}</h5>
    <p>{{product()?.description}}</p>
    <p>{{product()?.price}} £</p>
    <img [src]="product()?.image" style="height: 200px; width: 200px" alt="product image">

    <hr>
    <p>Checking resolver data management</p>
  `,
})
export class DetailComponent {
  id = input.required();
  // Récupère l'id sans utiliser ActivatedRoute mais en providant withComponentInputBinding()

  product: Signal<Product | undefined> = signal(inject(ActivatedRoute).snapshot.data['product']);
  // Récupère les données issues du Resolver (via ActivatedRoute)
}
