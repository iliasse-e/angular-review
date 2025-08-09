import { Component, linkedSignal, signal, WritableSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideDirective } from './click-outside.directive';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, FormsModule, ClickOutsideDirective],
  template: `
    <div id="dropdown-container">

      <input
        type="text"
        class="search"
        id="search-bar"
        placeholder="Search"
        [ngModel]="search()"
        (ngModelChange)="search.set($event)"
        (clickOutside)="closeDropdown()"
      >

      @if(isSearchDropdownOpened()) {
        <div id="result-container">
          @for (item of result(); track $index) {
            <div class="dropdown-item">{{item}}</div>
          }
        </div>
      }

    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {

  search = signal('');

  isSearchDropdownOpened = linkedSignal(() => !!this.search().length);

  result: WritableSignal<string[]> = signal([
    'Joe',
    'French Toast',
    'Buy a dog and die alone',
    'Mean'
  ]);

  closeDropdown(): void {
    this.isSearchDropdownOpened.set(false);
  }

}
