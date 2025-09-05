import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  template: `
    <button data-cy="decrement" (click)="decrement()">Decrement</button>
    <span data-cy="count">{{ count() }}</span>
    <button data-cy="increment" (click)="increment()">Increment</button>
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
