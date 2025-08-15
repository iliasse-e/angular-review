import { Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextColorDirective } from './directive/text-color.directive';
import { AlertDirective } from './directive/alert.directive';
import { HoverDirective } from "./directive/hover.directive";
import { CountDirective } from './directive/count.directive';
import { TooltipDirective } from "./directive/tooltip.directive";

@Component({
  selector: 'app-root',
  imports: [TextColorDirective, FormsModule, AlertDirective, HoverDirective, CountDirective, TooltipDirective],
  template: `
    <h1 #text>Titre de la page</h1>

    <section id="product-bloc">


      <h3>Directive 1 : Le champs prend la couleur que l'on écrit</h3>
      <label for="quantity">
        Renseigner la couleur
        <input
          textColor
          name="quantity"
          type="text"
        >
      </label>

      <h3>Directive 2 : Alerte au clic du bouton</h3>
      <button alert>Afficher l'alerte</button>

      <h3>Directive 3 : Trigger une fn() au survol</h3>
      <button appHover (hover)="render()" (click)="hide()">{{text?.style?.display == 'flex' ? 'Cliquez pour cacher le titre' : 'Survoler pour afficher le titre' }}</button>

      <h3>Directive 4 : Affiche compteur au clic</h3>
      <button count>Coumpter les clics</button>

      <h3>Directive 5 : Affiche une infobulle au survol du champ</h3>
      <textarea [tooltip]="inputText" [(ngModel)]="inputText" [ngModelOptions]="{updateOn: 'change'}">{{ inputText }}</textarea>

    </section>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {

  inputText = '';

  textElement = viewChild<ElementRef<HTMLParagraphElement>>('text');

  render() {
    const textElement = this.textElement();
    if (textElement)
      textElement.nativeElement.style.display = 'flex';
  }

  hide() {
    const textElement = this.textElement();
    if (textElement)
      textElement.nativeElement.style.display = 'none';
  }

}
