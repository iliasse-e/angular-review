import { Component, input, InputSignal, output, Output } from '@angular/core';
import { Product } from '../app.component';

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
              <img [src]="item?.image" [alt]="item?.description">
              <div class="content">
                <p (click)="clickEvent.emit(item?.id)">{{ item?.description }}</p>
              </div>
    
            </article>
          </div>
        }
  `,
  styleUrl: './scrollable-list.component.css'
})
export class ScrollableListComponent {
  
  public elements: InputSignal<Product[]> = input.required<Product[]>();

  public clickEvent = output<string | undefined>();
}
