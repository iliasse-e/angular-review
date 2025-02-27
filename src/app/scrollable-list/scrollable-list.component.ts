import { Component, input, InputSignal, output } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'scrollable-list',
  imports: [],
  standalone: true,
  template: `
        @for (item of elements(); track item.id) {
          <div class="cards">
            <article class="card">
              <header>
                <h3>{{ item.title }}</h3>
              </header>
              <img style="width: 100%;" [src]="item?.image" [alt]="item?.description">
              <div class="content">
                <p (click)="clickEvent.emit(item?.id)">{{ item?.description }}</p>
              </div>
    
            </article>
          </div>
        }
  `,
})
export class ScrollableListComponent {

  public elements: InputSignal<Product[]> = input.required<Product[]>();

  public clickEvent = output<string | undefined>();
}
