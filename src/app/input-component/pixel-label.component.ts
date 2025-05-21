import { Component, input, InputSignalWithTransform } from "@angular/core";

@Component({
  selector: 'pixel-label',
  template: `
    <p><span>{{value()}}</span></p>
  `
})
export class ChildBComponent {
  value: InputSignalWithTransform<string, any> = input('', {transform: appendPx, alias: 'widthPx'});
}

function appendPx(value: number): string {
  return value?.toString() + "px";
}