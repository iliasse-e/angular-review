import { Directive, Renderer2, HostListener, Input, inject } from '@angular/core';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {
  private render = inject(Renderer2);
  private tooltipElement!: HTMLElement;

  @Input('tooltip') tooltipText!: string;

  @HostListener('mouseenter')
  renderTooltip() {
    if (!this.tooltipText) {
      return;
    }
    this.tooltipElement = this.render.createElement('div');
    const text = this.render.createText(this.tooltipText);

    this.render.appendChild(this.tooltipElement, text);
    this.render.appendChild(document.body, this.tooltipElement);

    this.render.setStyle(this.tooltipElement, 'position', 'fixed');
    this.render.setStyle(this.tooltipElement, 'top', '50%');
    this.render.setStyle(this.tooltipElement, 'left', '50%');
    this.render.setStyle(this.tooltipElement, 'transform', 'translate(-50%, -50%)');
    this.render.setStyle(this.tooltipElement, 'background', '#333');
    this.render.setStyle(this.tooltipElement, 'color', '#fff');
    this.render.setStyle(this.tooltipElement, 'padding', '1rem 2rem');
    this.render.setStyle(this.tooltipElement, 'borderRadius', '8px');
    this.render.setStyle(this.tooltipElement, 'fontSize', '1.2rem');
    this.render.setStyle(this.tooltipElement, 'zIndex', '10000');
    this.render.setStyle(this.tooltipElement, 'opacity', '0');
    this.render.setStyle(this.tooltipElement, 'transition', 'opacity 0.3s ease');

    // Fade in
    setTimeout(() => {
      this.render.setStyle(this.tooltipElement, 'opacity', '1');
    }, 10);
  }

  @HostListener('mouseleave')
  removeTooltip() {
    if (this.tooltipElement) {
      this.render.setStyle(this.tooltipElement, 'opacity', '0');
      setTimeout(() => {
        if (this.tooltipElement) {
          this.render.removeChild(document.body, this.tooltipElement);
          this.tooltipElement = undefined!;
        }
      }, 300);
    }
  }
}
