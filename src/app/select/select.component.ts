import { Component, input } from '@angular/core';
import { IOptions } from '../app.component';

@Component({
  selector: 'app-select',
  standalone: true,
  template: `
  <section>
    <label for="select-id-element">Products</label>
    <select name="select-element" id="select-id-element">
      @for (option of options(); track option.key) {
        <option [id]="'option-' + option.key" [value]="option.key">{{option.label}}</option>
      }
    </select>
  </section>
  `,
})
export class SelectComponent {
  options = input.required<IOptions[]>();
}
