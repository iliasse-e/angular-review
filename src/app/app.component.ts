import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { APP_VERSION } from './app.config';

@Component({
  selector: 'app-root',
  imports: [],
  template: `
      <p>{{inputValue()}}</p>
      <input type="text" [value]="inputValue()" (input)="inputValue.set($any($event.target).value)">
      <p>{{placeHolder()}}</p>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular review';
  version = inject(APP_VERSION);

  public inputValue: WritableSignal<string> = signal('');

  public placeHolder: Signal<string> = computed(() => {
    const input: string = this.inputValue();
    if (input.length < 10 && input.length) return 'Finissez votre phrase';
    if (input.length > 10) return 'Laissez moi réflechir';
    return 'Ecrivez moi quelquechose';
  })
  
}
