import { Component, input, InputSignal, output } from '@angular/core';
import { Product } from '../app.component';

@Component({
  selector: 'scrollable-list',
  imports: [],
  standalone: true,
  template: `
    <div class="cards-container">
        @for (item of elements(); track item.id) {
            <article class="card">
              <img class="card-img" [src]="item?.image" [alt]="item?.description">
              <div class="card-info">
                <h3>{{ item.title }}</h3>
                <p (click)="clickEvent.emit(item?.id)">{{ item?.description }}</p>
              </div>
            </article>
          }
      </div>
  `,
  styleUrls: ['./scrollable-list.component.css']
})
export class ScrollableListComponent {
  public elements: InputSignal<Product[]> = input.required<Product[]>();
  public clickEvent = output<string | undefined>();
}
