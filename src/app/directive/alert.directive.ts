import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[alert]' // Si nous souhaitons prendre les éléments ayant la classe alert, nous aurions mis .alert
})
export class AlertDirective {

  // Indique que la méthode en-dessous run() est éxécutée au clic
  @HostListener('click')
  run() {
    alert('Bonjour')
  }

}

