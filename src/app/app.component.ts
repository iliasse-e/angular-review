import {Component, signal, ChangeDetectionStrategy, inject} from '@angular/core';
import {form, Field, required, email, minLength, submit} from '@angular/forms/signals';
import { LoginService } from './login.service';
import { NgClass } from '@angular/common';

interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-root',
  template: `
  <h2>Signal Form's introduction</h2>
  <form>
  <div id="form-state-light"
  [ngClass]="{
    invalid: loginForm().invalid(),
    valid: loginForm().valid(),
    pristine: !loginForm().dirty()
  }"></div>
    <label>
      Email:
      <input type="email" [field]="loginForm.email" />
    </label>
    @if (loginForm.email().dirty() && loginForm.email().errors().length) {
      <p class="error">{{ loginForm.email().errors().at(0)?.message }}</p>
    }

    <label>
      Password:
      <input type="password" [field]="loginForm.password" />
    </label>
    @if (loginForm.password().dirty() && loginForm.password().errors().length) {
      <p class="error">{{ loginForm.password().errors().at(0)?.message }}</p>
    }

    <button
      (click)="onSubmit($event)"
      [disabled]="loginForm().invalid()"
    >Submit</button>

    @if(loginForm().submitting()) {
      <p>Authentication progressing...</p>
    }

    @if (loginForm().errors().length && loginForm.password().dirty()) {
      <p class="error">Error authentication : {{ loginForm().errors().at(0)?.message }}</p>
    }
  </form>
`,
  styleUrl: 'app.component.css',
  imports: [Field, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  private loginService: LoginService = inject(LoginService);

  // Créé le modèle de données
  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  // Déclare le formulaire et ses validateurs
  loginForm = form(this.loginModel, (fieldPath) => {
  required(fieldPath.email, {message: 'Email is required'});
  email(fieldPath.email, {message: 'Enter a valid email address'});
  required(fieldPath.password, {message: 'Password is required'});
  minLength(fieldPath.password, 3, {message: 'The password should be at least 3 characters'})
  });

  async onSubmit(event: Event) {
    event.preventDefault();

    await submit(this.loginForm, async (form): Promise<any> => {
      const result = await this.loginService.login(
        form.email().value(),
        form.password().value()
      )
      .then(response => response?.json());

      if (!result.ok) {
        return [{ kind: 'server', message: 'Username or password false' }];
      }

      return undefined;
    })
  }

}
