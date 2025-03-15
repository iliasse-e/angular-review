import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface FormType {
  firstname: FormControl<string>;
  lastname: FormControl<string | null>;
  age: FormControl<number | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
      <form [formGroup]="form" (submit)="sub()">
        <div class="flex flex-col mb-10">
          <label for="firstname">Prénom</label>
          <input formControlName="firstname" type="text" id="firstname" />
        </div>

        <div class="flex flex-col mb-10">
          <label for="lastname">Nom</label>
          <input formControlName="lastname" type="text" id="lastname" />
        </div>

        <div class="flex flex-col mb-10">
          <label for="age">Age</label>
          <input formControlName="age" type="number" id="age" />
        </div>

        <div class="flex flex-col mb-10">
          <label for="email">E-mail</label>
          <input formControlName="email" type="text" id="email" />
        </div>

        <div class="flex flex-col mb-10">
          <label for="password">Mot de passe</label>
          <input formControlName="password" type="password" id="password" />
        </div>

        <button>Submit</button>
      </form>

      <pre>{{form.value | json}}</pre>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  form: FormGroup<FormType> = new FormGroup({
    firstname: new FormControl('', {nonNullable: true}), // nonNullable donne une valeur en cas de reset
    lastname: new FormControl(''),
    age: new FormControl(0),
    email: new FormControl(''),
    password: new FormControl(''),
  }, {updateOn: 'blur'}) // updateOn à quel moment on déclanche le update de l'état du reactive form

  sub() {
    this.form.reset();
  }
  
}
