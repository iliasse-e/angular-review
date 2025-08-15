import { Directive, signal } from '@angular/core';

@Directive({
  selector: '[textColor]',
  host: {
    '[style.color]': 'color()',
    '(window:keyup)': 'updateColor($event)'
  },
})
export class TextColorDirective {

  color = signal<string>('');

  updateColor(event: KeyboardEvent) {
    this.color.set((event.target as any).value)
  }

}
