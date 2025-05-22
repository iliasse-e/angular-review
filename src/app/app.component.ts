import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MyButtonComponent } from "./styling-component/my-button.component";
import { ChildAComponent } from './input-component/child-a.component';
import { ChildBComponent } from "./input-component/pixel-label.component";
import { CustomSlider } from "./input-component/custom-slider.component";
import { Checkbox } from "./input-component/checkbox.component";
@Component({
  selector: 'app-root',
  imports: [FormsModule, MyButtonComponent, ChildAComponent, ChildBComponent, CustomSlider, Checkbox],
  template: `
    <child-a [value]="5"></child-a>
    
    <pixel-label [widthPx]="12" />

    <slider [disabled]="'false'" />

    <checkbox-fieldset [(selected)]="selectedCheckbox" (selectedChange)="bindingHandler()" />  
    
    <p>Option sélectionnée : 
      <span>{{selectedCheckbox() || "Aucune"}}</span>
    </p>
    
    <my-button />
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {

  selectedCheckbox = signal(1);

  bindingHandler() {
    // The input model in Checkbox component automatically creates an output named "selectedChange".
    // Can be subscribed to using `(selectedChange)="handler()"` in the template.
    console.log('the model input has been set/update', 'angular automatic selectedChange ouptput has been called');
  }

}
