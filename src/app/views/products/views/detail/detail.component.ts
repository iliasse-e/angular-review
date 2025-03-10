import { Component, input } from '@angular/core';

@Component({
  selector: 'app-detail',
  imports: [],
  template: `
    <h3>Detail product {{id()}}</h3>
  `,
})
export class DetailComponent {
  id = input.required();
  // Récupère l'id sans utiliser  ActivatedRoute mais en providant withComponentInputBinding()
}
