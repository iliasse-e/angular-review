import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputDirective } from './input.directive';

@Component({
  selector: 'app-root',
  imports: [InputDirective, FormsModule],
  template: `
      <section id="product-bloc">
        <label for="quantity">
          Quantity
          <input 
            appInput 
            name="quantity" 
            type="number" 
            [ngModel]="quantity()" 
            (ngModelChange)="quantity.set($event)"
          >
        </label>
      </section>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {

  quantity: WritableSignal<number> = signal(0)
  
}
