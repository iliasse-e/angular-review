import { JsonPipe } from '@angular/common';
import { Component, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailExistsValidatorAsync, forbidEmailValidator, nameValidator, passwordMatchValidator } from './validator';

interface FormType {
  firstname: FormControl<string>;
  lastname: FormControl<string | null>;
  age: FormControl<number | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
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
          @let firstname = form.get('firstname');
          @if (firstname?.errors?.['required'] && firstname?.touched) {
            <span class="error">Le champs est obligatoire</span>
          } @else if (firstname?.errors?.['minlength'] && firstname?.touched) {
            <span class="error">Vous avez renseigné 
              {{firstname?.errors?.['minlength']?.['actualLength']}} charactères sur
              {{firstname?.errors?.['minlength']?.['requiredLength']}} </span>
          }
        </div>

        <div class="flex flex-col mb-10">
          <label for="lastname">Nom</label>
          <input formControlName="lastname" type="text" id="lastname" />
          @if (form.get('lastname')?.hasError('forbiddenName')) {
            <span class="error">Ce nom n'est pas autorisé</span>
          }
        </div>

        <div class="flex flex-col mb-10">
          <label for="age">Age</label>
          <input formControlName="age" type="number" id="age" />
        </div>

        <div class="flex flex-col mb-10">
          <label for="email">E-mail</label>
          <input formControlName="email" type="text" id="email" />
          @if (form.get('email')?.hasError('forbiddenMail')) {
            <span class="error">Les emails russes sont interdits</span>
          } @else if (form.get('email')?.hasError('emailExists')) {
            <span class="error">Cet email est déjà existant</span>
          }
        </div>

        <div class="flex flex-col mb-10">
          <label for="password">Mot de passe</label>
          <input formControlName="password" type="password" id="password" />
        </div>

        <div class="flex flex-col mb-10">
          <label for="confirmPassword">Confirmez mot de passe</label>
          <input formControlName="confirmPassword" type="password" id="confirmPassword" />
        </div>

        @if (form.contains('secret')) {
          <div class="flex flex-col mb-10">
            <label for="secret">Secret field</label>
            <input formControlName="secret" type="text" id="secret" />
          </div>
        }

        <button id="submit-btn">Submit</button>
        @if (form.hasError('passwordMismatch') && (form.get('password')?.dirty && form.get('confirmPassword')?.dirty)) {
            <span class="error">Les mots de passe sont incohérents</span>
          }
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
    lastname: new FormControl('', nameValidator()),
    age: new FormControl(0),
    email: new FormControl('', {
      validators: forbidEmailValidator('.ru'),
      asyncValidators: emailExistsValidatorAsync
    }),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  }, {
    updateOn: 'change', // updateOn : à quel moment on déclanche le update de l'état du reactive form
    validators: [passwordMatchValidator] // validator pour le formGroup (qui compare deux controls)
  }) 
  
  nameChanges = toSignal(this.form.controls.firstname.valueChanges);

  constructor() {
    effect(() => { // Met à jour le formulaire en fonction de l'input dans le champ prénom
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
