import { JsonPipe } from '@angular/common';
import { Component, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface FormType {
  firstname: FormControl<string>;
  lastname: FormControl<string | null>;
  age: FormControl<number | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  secret?: FormControl<string>;
}

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
    <div class="form-container">
      <form [formGroup]="form" (submit)="sub()">
        <div class="flex flex-col mb-10 tooltip">
          <label for="firstname">Prénom</label>
          <span class="tooltiptext">Tapez "secret"</span>
          <input formControlName="firstname" type="text" id="firstname" />
          @let firstnameErrors = form.get('firstname')?.errors;
          @if (firstnameErrors?.['required']) {
            <span class="error">Le champs est obligatoire</span>
          } @else if (firstnameErrors?.['minlength']) {
            <span class="error">Vous avez renseigné 
              {{firstnameErrors?.['minlength']?.['actualLength']}} charactères sur
              {{firstnameErrors?.['minlength']?.['requiredLength']}} </span>
          }
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

        @if (form.contains('secret')) {
          <div class="flex flex-col mb-10">
            <label for="secret">Secret field</label>
            <input formControlName="secret" type="text" id="secret" />
          </div>
        }

        <button id="submit-btn">Submit</button>
      </form>
      <button (click)="toggle()">{{form.controls.email.disabled ? 'Enable email' : 'Disable email'}}</button>
    </div>

    <div class="data" style="display: flex;">
      <pre>{{form.value | json}}</pre>
      <pre>{{form.getRawValue() | json}}</pre>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  form: FormGroup<FormType> = new FormGroup({
    firstname: new FormControl('', {
      nonNullable: true, // nonNullable : donne une valeur en cas de reset
      validators: [Validators.required, Validators.minLength(4)]
    }),
    lastname: new FormControl(''),
    age: new FormControl(0),
    email: new FormControl(''),
    password: new FormControl(''),
  }, {updateOn: 'change'}) // updateOn : à quel moment on déclanche le update de l'état du reactive form

  events = toSignal(this.form.events);
  nameChanges = toSignal(this.form.controls.firstname.valueChanges);

  constructor() {
    effect(() => {
      if (this.nameChanges() === "secret" && !this.form.contains('secret')) {
        this.form.addControl('secret', new FormControl('Secret juice', {nonNullable: true}));
      } else if (this.form.contains('secret') && this.nameChanges() !== "secret") {
        this.form.removeControl('secret');
      }
    })
  }

  sub() {
    this.form.reset();
  }

  toggle() {
    this.form.controls.email.disabled
      ? this.form.controls.email.enable()
      : this.form.controls.email.disable();
  }
  
}
