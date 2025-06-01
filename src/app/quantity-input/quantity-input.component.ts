import { Component, inject, model, ModelSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalService } from '../app.component';

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
  readonly #localService = inject(LocalService)
  public quantity = signal<number>(this.#localService.data);
}
