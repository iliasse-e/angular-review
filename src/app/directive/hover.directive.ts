import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  @Output() hover = new EventEmitter();

  @HostListener('mouseenter')
  onMouseEnter() {
    this.hover.emit();
  }

}
