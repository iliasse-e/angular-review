import { Directive, ElementRef, inject, signal } from '@angular/core';

@Directive({
  selector: '[appInput]',
  host: {
    // 2nde façon :
    // [style.color]: 'getColor()',
    // '[style.color]': '"blue"',
    '[style.color]': 'color()',
  },
})
export class InputDirective {

  myhost = inject(ElementRef<HTMLInputElement>);
  color = signal<string>('purple');

  constructor() {
    // 1re façon :
    // this.myhost.nativeElement.style.color = 'red';
  }

  getColor() {
    return 'orange';
  }

}
