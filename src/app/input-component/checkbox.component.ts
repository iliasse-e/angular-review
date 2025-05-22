import { Component, model } from '@angular/core';

@Component({
    selector: 'checkbox-fieldset',
    template: `
    <fieldset>
        <legend>Choisir la mesure à renseigner : </legend>

        @for(item of items; track item.id) {
            <div>
               <input 
               type="radio" 
               id="{{item.id}}" 
               name="radioGroup" 
               value="{{item.id}}" 
               [checked]="selected() === item.id"
               (click)="check(item.id)"
               >
               <label for="{{item.id}}">{{item.name}}</label>
             </div>
        }
    </fieldset>
`
})
export class Checkbox {

    selected = model.required();
    // The input model automatically creates an output named "selectedChange"

    items = [{ id: 1, name: 'Option 1' }, { id: 2, name: 'Option 2' }, { id: 3, name: 'Option 3' }];

    check(value: number) {
        this.selected.set(value);
    }
}

@Component({
    selector: 'custom-checkbox-fieldset',
    template: `
    <p>custom-checkbox-fieldset works</p>
    `,
    inputs: ['selected']
})
export class CustumCheckbox extends Checkbox {
}