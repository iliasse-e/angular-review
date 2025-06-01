import { Component, inject, Injectable, signal } from '@angular/core';
import { APP_VERSION } from './app.config';
import { QuantityInputComponent } from './quantity-input/quantity-input.component';

@Injectable()
export class LocalService {
  readonly data = 100;
}

@Component({
  selector: 'app-root',
  template: `
  <p>Version : {{version()}}</p>
  <quantity-input />
  `,
  styleUrl: './app.component.css',
  providers: [LocalService],
  imports: [QuantityInputComponent]
})
export class AppComponent {
  #versionService = inject(APP_VERSION)
  version = signal(this.#versionService)
}
