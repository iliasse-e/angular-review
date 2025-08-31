import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  template: `

    <p>My name is {{name.value}}</p>

    <label for="name-control">Name</label>
    <input type="text" id="name-control" [formControl]='name'>

    @if (name.touched && name.errors?.['required']) {
      <pre>Name is required</pre>
    }
    @if (name.touched && name.errors?.['minlength']) {
      <pre>Name should be at least 3 characters</pre>
    }

  `,
})
export class InputComponent {

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);

}
