import { Component, model, ModelSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'quantity-input',
  imports: [FormsModule],
  standalone: true,
  template: `
      <label for="quantity">
        Quantity
        <input 
          name="quantity"
          type="number"
          [(ngModel)]="quantity"
        >
      </label>
  `
})
export class QuantityInputComponent {
  public quantity: ModelSignal<number> = model.required<number>();
}
