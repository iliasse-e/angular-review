import { Directive, ElementRef, inject, Input, signal } from '@angular/core';

@Directive({
  selector: '[appInput]',
  host: {
    // 2nde façon :
    // [style.color]: 'getColor()',
    // '[style.color]': '"blue"',
    '[style.color]': 'color()',
    // '(window:keyup)': 'updateColor($event)'
  },
})
export class InputDirective {

  myhost = inject(ElementRef<HTMLInputElement>);
  
  @Input('appInput')
  color = signal<string>('');

  constructor() {
    // 1re façon :
    // this.myhost.nativeElement.style.color = 'red';
  }

  getColor() {
    return 'orange';
  }

  updateColor(event: KeyboardEvent) {
    this.color.set((event.target as any).value)
  }

}
