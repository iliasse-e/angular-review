import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  template: `

    <form [formGroup]="form" name="form">

      <div>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" formControlName="name" />
      </div>

      <div>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" formControlName="email" />
      </div>

      <div>
        <label for="age">Age</label>
        <input type="number" id="age" name="age" formControlName="age" />
      </div>

    </form>

  `
})
export class FormComponent {

  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    age: new FormControl(''),
  })

}
