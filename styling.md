### Styling components


####  `ViewEncapsulation.Emulated`

By default, Angular uses emulated encapsulation so that a component's styles only apply to elements defined in that component's template. In this mode, the framework generates a unique HTML attribute for each component instance, adds that attribute to elements in the component's template, and inserts that attribute into the CSS selectors defined in your component's styles.

```typescript
@Component({
  ...
  template: `
    <button class="my-btn">My Button</button>
  `,
  styles: [`.my-btn {color: red}`],
  encapsulation: ViewEncapsulation.Emulated // By default
})
export class MyButtonComponent {}

// DOM

<button _ngcontent-ng-c2265100744="" class="my-btn">My Button</button>

// Style attribute

.my-btn[_ngcontent-ng-c2265100744] {
  color: var(--darkreader-text-ff0000, #ff2121);
}
```

`::ng-deep`

Angular's emulated encapsulation mode supports a custom pseudo class, ::ng-deep. Applying this pseudo class to a CSS rule disables encapsulation for that rule. Not recommanded !

#
#### `ViewEncapsulation.ShadowDom`

This mode strictly guarantees that only that component's styles apply to elements in the component's template. Global styles cannot affect elements in a shadow tree and styles inside the shadow tree cannot affect elements outside of that shadow tree.

#
#### `ViewEncapsulation.None`

This mode disables all style encapsulation for the component. Any styles associated with the component behave as global styles.

#

    NOTE: In `Emulated` and `ShadowDom` modes, Angular doesn't 100% guarantee that your component's styles will always override styles coming from outside it.
    It is assumed that these styles have the same specificity as your component's styles in case of collision.

[The official documentation](https://angular.dev/guide/components/styling)