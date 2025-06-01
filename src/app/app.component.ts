import { Component, inject, Injectable, signal } from '@angular/core';
import { APP_VERSION } from './app.config';
import { QuantityInputComponent } from './quantity-input/quantity-input.component';
import { ProductService } from './product.service';

@Injectable()
export class LocalService {
  readonly data = 100;
}

@Component({
  selector: 'app-root',
  template: `
  <p>Version : {{version()}}</p>

  <ul>
    @for (item of productService.products(); track $index) {
      <li>{{item}} <span (click)="productService.delete($index)" style="color: red;">delete</span></li>
    }
  </ul>
  <input type="text" #productInput>
  <button (click)="productService.add(productInput.value)">Add product</button>

  <quantity-input />
  `,
  styleUrl: './app.component.css',
  providers: [LocalService],
  imports: [QuantityInputComponent]
})
export class AppComponent {
  #versionService = inject(APP_VERSION)
  version = signal(this.#versionService)

  productService = inject(ProductService);
}
