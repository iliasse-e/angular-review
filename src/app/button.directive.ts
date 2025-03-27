import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appButton]'
})
export class ButtonDirective {

  // Indique que la méthode en-dessous run() est éxécutée au clic
  @HostListener('click', ['$event'])
  run(event: Event) {
    alert(JSON.stringify(event))
  }

}
