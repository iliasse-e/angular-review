import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputDirective } from './input.directive';
import { ButtonDirective } from './button.directive';

@Component({
  selector: 'app-root',
  imports: [InputDirective, FormsModule, ButtonDirective],
  template: `
      <section id="product-bloc">
        <label for="quantity">
          Your color
          <input 
            [appInput]="color"
            name="quantity" 
            type="text"
            [ngModel]="color()" 
            (ngModelChange)="color.set($event)"
          >
        </label>
        <button appButton type="button">Behaviour on click</button>
      </section>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {

  color: WritableSignal<string> = signal('green')
  
}
