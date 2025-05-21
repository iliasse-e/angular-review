import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MyButtonComponent } from "./styling-component/my-button.component";
import { ChildAComponent } from './input-component/child-a.component';
import { ChildBComponent } from "./input-component/pixel-label.component";
import { CustomSlider } from "./input-component/custom-slider.component";
@Component({
  selector: 'app-root',
  imports: [FormsModule, MyButtonComponent, ChildAComponent, ChildBComponent, CustomSlider],
  template: `
    <child-a [value]="5"></child-a>
    
    <pixel-label [widthPx]="12" />

    <slider [disabled]="'false'" />
    
    <my-button />
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {

}
