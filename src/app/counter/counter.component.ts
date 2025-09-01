import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  template: `
    <button (click)="decrement()">Decrement</button>
    <span data-testid="value">{{ count() }}</span>
    <button (click)="increment()">Increment</button>
  `
})
export class CounterComponent {

  count = signal(0);

  decrement() {
    this.count.update((v) => v - 1)
  }

  increment() {
    this.count.update((v) => v + 1)
  }

}
