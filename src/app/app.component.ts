import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MyButtonComponent } from "./my-button/my-button.component";

@Component({
  selector: 'app-root',
  imports: [FormsModule, MyButtonComponent],
  template: `
    <my-button />
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {

}
