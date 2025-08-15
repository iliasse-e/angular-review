import { Directive, HostListener, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective {

  private render = inject(Renderer2);

  @HostListener('mouseenter')
  renderTooltip() {
  }


}
