import { Directive, HostListener, inject, Renderer2, signal } from "@angular/core";

@Directive({
  selector: '[count]'
})
export class CountDirective {

  private render = inject(Renderer2);
  private count = signal(0);

  private showCounter(value: number): void {
    const overlay = this.render.createElement('div');
    const text = this.render.createText(value.toString());

    this.render.appendChild(overlay, text);
    this.render.appendChild(document.body, overlay);

    this.render.setStyle(overlay, 'position', 'fixed');
    this.render.setStyle(overlay, 'top', '50%');
    this.render.setStyle(overlay, 'left', '50%');
    this.render.setStyle(overlay, 'transform', 'translate(-50%, -50%)');
    this.render.setStyle(overlay, 'fontSize', '10rem');
    this.render.setStyle(overlay, 'fontWeight', 'bold');
    this.render.setStyle(overlay, 'color', '#fff');
    this.render.setStyle(overlay, 'background', 'rgba(0,0,0,0.7)');
    this.render.setStyle(overlay, 'padding', '1rem 2rem');
    this.render.setStyle(overlay, 'borderRadius', '1rem');
    this.render.setStyle(overlay, 'zIndex', '9999');
    this.render.setStyle(overlay, 'opacity', '0');
    this.render.setStyle(overlay, 'transition', 'opacity 0.5s ease');

    // Apparition
    setTimeout(() => {
      this.render.setStyle(overlay, 'opacity', '1');
    }, 10);

    // Disparition
    setTimeout(() => {
      this.render.setStyle(overlay, 'opacity', '0');
      setTimeout(() => {
        this.render.removeChild(document.body, overlay);
      }, 500);
    }, 1000);
  }

  @HostListener('click', ['$event'])
  increment() {
    this.count.update(() => this.count() + 1);
    this.showCounter(this.count());
  }

}
