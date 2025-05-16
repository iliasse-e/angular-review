import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'my-button',
  template: `
    <button class="my-btn">My Button</button>
  `,
  styles: [`.my-btn {color: red}`],
  encapsulation: ViewEncapsulation.ShadowDom // By default
})
export class MyButtonComponent {

}
