import { Component, input } from '@angular/core';
import { IOptions } from '../app.component';
import { MatSelect, MatOption, MatFormField, MatLabel } from '@angular/material/select'

@Component({
  selector: 'app-select',
  imports: [MatSelect, MatOption, MatFormField, MatLabel],
  standalone: true,
  template: `
  <mat-form-field>
    <mat-label>Products</mat-label>
    <mat-select name="select-element" id="select-id-element">
      @for (option of options(); track option.key) {
        <mat-option [id]="'option-' + option.key" [value]="option.key">{{option.label}}</mat-option>
      }
    </mat-select>
  </mat-form-field>
  
  `,
})
export class SelectComponent {

  options = input.required<IOptions[]>();

}
