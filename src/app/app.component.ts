import {Component, signal, ChangeDetectionStrategy} from '@angular/core';
import {form, Field, required, email, minLength} from '@angular/forms/signals';

interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-root',
  template: `
  <h2>Signal Form's introduction</h2>
  <form>
    <label>
      Email:
      <input type="email" [field]="loginForm.email" />
    </label>
    @if (loginForm.email().dirty()) {
      <p class="error">{{ loginForm.email().errors().at(0)?.message }}</p>
    }

    <label>
      Password:
      <input type="password" [field]="loginForm.password" />
    </label>
    @if (loginForm.password().dirty()) {
      <p class="error">{{ loginForm.password().errors().at(0)?.message }}</p>
    }

    <button
      type="button"
      [disabled]="loginForm().invalid()"
    >Submit</button>
  </form>
`,
  styleUrl: 'app.component.css',
  imports: [Field],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (fieldPath) => {
  required(fieldPath.email, {message: 'Email is required'});
  email(fieldPath.email, {message: 'Enter a valid email address'});
  required(fieldPath.password, {message: 'Password is required'});
  minLength(fieldPath.password, 3, {message: 'The password should be at least 3 characters'})
  });

}
