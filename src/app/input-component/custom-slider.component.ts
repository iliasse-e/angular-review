import {Component, input, booleanAttribute, numberAttribute} from '@angular/core';

@Component({
    selector: 'slider',
    template: `
    <div>
        <input 
        type="range" 
        min="0" 
        max="20"
        id="slider"
        [disabled]="disabled()"
        [value]="value()"/>
        
        <label for="slider">Volume</label>
    </div>
    `
})
export class CustomSlider {
  disabled = input(false, {transform: booleanAttribute});
  value = input(0, {transform: numberAttribute});
}