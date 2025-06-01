import { JsonPipe } from '@angular/common';
import { Component, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailExistsValidatorAsync, forbidEmailValidator, nameValidator, passwordMatchValidator } from './validator';

interface FormType {
  firstname: FormControl<string>;
  lastname: FormControl<string | null>;
  age: FormControl<number | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
  secret?: FormControl<string>;
  adress: FormGroup<{
    zip: FormControl<number>;
    city: FormControl<string | null>;
    street: FormControl<string | null>;
  }>
  languages: FormArray<FormGroup<{
    name: FormControl<string | null>;
    level: FormControl<number>;
  }>>
}

const languageLevel = [
  {
    level: 0,
    label: 'notions'
  },
  {
    level: 1,
    label: 'courant'
  },
  {
    level: 2,
    label: 'bilingue'
  },
  {
    level: 3,
    label: 'natif'
  }
]

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

          <!-- champ firstname -->
          @let firstname = form.get('firstname');
          @if (firstname?.errors?.['required'] && firstname?.touched) {
            <span class="error">Le champs est obligatoire</span>
          } @else if (firstname?.errors?.['minlength'] && firstname?.touched) {
            <span class="error">Vous avez renseigné 
              {{firstname?.errors?.['minlength']?.['actualLength']}} charactères sur
              {{firstname?.errors?.['minlength']?.['requiredLength']}} </span>
          }
        </div>

        <!-- champ lastname -->
        <div class="flex flex-col mb-10">
          <label for="lastname">Nom</label>
          <input formControlName="lastname" type="text" id="lastname" />
          @if (form.get('lastname')?.hasError('forbiddenName')) {
            <span class="error">Ce nom n'est pas autorisé</span>
          }
        </div>

        <!-- champ age -->
        <div class="flex flex-col mb-10">
          <label for="age">Age</label>
          <input formControlName="age" type="number" id="age" />
        </div>

        <!-- champ mail -->
        <div class="flex flex-col mb-10">
          <label for="email">E-mail</label>
          <input formControlName="email" type="text" id="email" />
          @if (form.get('email')?.hasError('forbiddenMail')) {
            <span class="error">Les emails russes sont interdits</span>
          } @else if (form.get('email')?.hasError('emailExists')) {
            <span class="error">Cet email est déjà existant</span>
          }
        </div>

        <!-- groupe champs adress -->
        <ng-container formGroupName="adress">
          
          <div class="flex flex-col mb-10">
            <label for="zip">Code postal</label>
            <input formControlName="zip" type="number" id="zip" />
            @let zip = form.get('adress.zip')!;
            @if ((zip.hasError('min') || zip.hasError('max')) && zip.dirty) {
            <span class="error">Le code doit être entre 1000 et 9999</span>
          }
          </div>
  
          <div class="flex flex-col mb-10">
            <label for="street">Adresse</label>
            <input formControlName="street" type="text" id="street" />
          </div>
  
          <div class="flex flex-col mb-10">
            <label for="city">Commune</label>
            <input formControlName="city" type="number" id="city" />
          </div>

        </ng-container>

        <!-- tableau champs languages -->
        @if (languages.length) {
          <div formArrayName="languages">
            @for (guest of languages.controls; track $index) {
            <div [formGroupName]="$index">
              <h3>Langue #{{ $index + 1 }}</h3>
  
              <div>
                <label>Nom :</label>
                <input formControlName="name" />
              </div>
  
              <div>
                <label>Niveau :</label>
                <select formControlName="level" id="level">
                  @for (item of level; track item.level) {
                    <option [ngValue]="item.level">{{item.label}}</option>
                  }
                </select>
              </div>
  
              <button type="button" (click)="deleteLanguage($index)">
                Supprimer
              </button>
            </div>
            }
          </div>
        }

        <button type="button" (click)="addLanguage()">Ajouter une langue</button>


        <div class="flex flex-col mb-10">
          <label for="password">Mot de passe</label>
          <input formControlName="password" type="password" id="password" />
        </div>

        <div class="flex flex-col mb-10">
          <label for="confirmPassword">Confirmez mot de passe</label>
          <input formControlName="confirmPassword" type="password" id="confirmPassword" />
        </div>

        <!-- champ secret -->
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
      <button (click)="toggleEmail()">{{form.controls.email.disabled ? 'Enable email' : 'Disable email'}}</button>
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
      asyncValidators: emailExistsValidatorAsync,
    }),
    adress: new FormGroup({
      zip: new FormControl(0, {nonNullable: true, validators: [Validators.min(1000), Validators.max(9999)]}),
      city: new FormControl(''), // accessible via form.get('adress.city')
      street: new FormControl(''),
    }),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    languages: new FormArray<any>([]),
  }, {
    updateOn: 'change', // updateOn : à quel moment on déclanche le update de l'état du reactive form
    validators: [passwordMatchValidator] // validator pour le formGroup (qui compare deux controls)
  })

  level = languageLevel;
  
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

  toggleEmail() {
    this.form.controls.email.disabled
      ? this.form.controls.email.enable()
      : this.form.controls.email.disable();
  }

  get languages(): FormArray {
    return this.form.get('languages') as FormArray;
  }

  addLanguage() {
    this.languages.push(new FormGroup({
      name: new FormControl('', Validators.required),
      level: new FormControl(0)
    }));
  }

  deleteLanguage(index: number) {
    this.languages.removeAt(index);
  }
  
}
