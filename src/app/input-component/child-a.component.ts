import { Component, input, InputSignal, booleanAttribute } from '@angular/core';

@Component({
  selector: 'child-a',
  template: `
    <input type="number" [value]="value()"/>

    <p><span>{{value2() || 'no value'}}</span></p>
  `
})
export class ChildAComponent {
  // input properties

  // here input is a number, returning InputSignal<number>.
  value: InputSignal<number> = input(0);

  // Produces an InputSignal<number | undefined> because `value2` may not be set.
  value2 = input<number>();

  disabled = input(false, {transform: booleanAttribute});
}

