# Accepting data with input properties


### Input function

`input` is a function of type `InputFunction`

The `input` function returns an `InputSignal`. You can read the value by calling the signal.

Signals created by the input function are read-only.

#
###  Required inputs

You can declare that an input is required by calling input.required instead of input:

```typescript
value = input.required<number>();
```
#
### Configuring inputs

#### Transform function

```typescript
@Component({
  selector: 'custom-slider',
  /*...*/
})
export class CustomSlider {
  label = input('', {transform: trimString});
}

function trimString(value: string | undefined): string {
  return value?.trim() ?? '';
}
```

```typescript
<custom-slider [label]="systemVolume" />
```

In the example above, whenever the value of systemVolume changes, Angular runs trimString and sets label to the result.

#### Type checking

When you specify an input transform, the type of the transform function's parameter determines the types of values that can be set to the input in a template.

```typescript
@Component({/*...*/})
export class CustomSlider {
  widthPx = input('', {transform: appendPx});
}
function appendPx(value: number): string {
  return `${value}px`;
}
```

In the example above, the widthPx input accepts a number while the InputSignal property returns a string.


####  Built-in transformations

Angular includes two built-in transform functions for the two most common scenarios: coercing values to boolean and numbers.

```typescript
disabled = input(false, {transform: booleanAttribute});

value = input(0, {transform: numberAttribute});
```

`booleanAttribute` imitates the behavior of standard HTML [boolean attributes](https://developer.mozilla.org/docs/Glossary/Boolean/HTML), where the
_presence_ of the attribute indicates a "true" value. However, Angular's `booleanAttribute` treats the literal string `"false"` as the boolean `false`.

`numberAttribute` attempts to parse the given value to a number, producing `NaN` if parsing fails.


#### Input aliases

```typescript
@Component({/*...*/})
export class CustomSlider {
  value = input(0, {alias: 'sliderValue'});
}

// Template usecase      
<custom-slider [sliderValue]="50" />
```

#
## Model inputs

Model inputs are a special type of input that enable a component to propagate new values back to its parent component.

Both types of input allow someone to bind a value into the property. However, model inputs allow the component author to write values into the property. If the property is bound with a two-way binding, the new value propagates to that binding.

```typescript
@Component({ /* ... */})
export class CustomSlider {
  // Define a model input named "value".
  value = model(0);
  increment() {
    // Update the model input with a new value, propagating the value to any bindings.
    this.value.update(oldValue => oldValue + 10);
  }
}
@Component({
  /* ... */
  // Using the two-way binding syntax means that any changes to the slider's
  // value automatically propagate back to the `volume` signal.
  // Note that this binding uses the signal *instance*, not the signal value.
  template: `<custom-slider [(value)]="volume" />`,
})
export class MediaControls {
  // Create a writable signal for the `volume` local state.
  volume = signal(0);
}
```

In the above example, the `CustomSlider` can write values into its `value` model input, which then propagates those values back to the `volume` signal in `MediaControls`. This binding keeps the values of `value` and `volume` in sync. Notice that the binding passes the `volume` signal instance, not the _value_ of the signal.

In other respects, model inputs work similarly to standard inputs. You can read the value by calling the signal function, including in reactive contexts like `computed` and `effect`.


#### Two-way binding with plain properties

You can bind a plain JavaScript property to a model input.

```typescript
protected volume = 0;
```

In the example above, the `CustomSlider` can write values into its `value` model input, which then propagates those values back to the `volume` property in `MediaControls`. This binding keeps the values of `value` and `volume` in sync.

### Implicit `change` events

When you declare a model input in a component or directive, Angular automatically creates a corresponding [output](guide/components/outputs) for that model. The output's name is the model input's name suffixed with "Change".

```typescript
@Directive({ /* ... */ })
export class CustomCheckbox {
  // This automatically creates an output named "checkedChange".
  // Can be subscribed to using `(checkedChange)="handler()"` in the template.
  checked = model(false);
}
```

Angular emits this change event whenever you write a new value into the model input by calling its `set` or `update` methods.

Model inputs do not support input transforms.

###  When to use model inputs

Use model inputs when you want a component to support two-way binding. This is typically appropriate when a component exists to modify a value based on user interaction. Most commonly, custom form controls, such as a date picker or combobox, should use model inputs for their primary value.

## @Input

You can alternatively declare component inputs by adding the @Input decorator to a property:

####  Customizing decorator-based inputs

The @Input decorator accepts a config object that lets you change the way that input works.

```typescript
@Component({...})
export class CustomSlider {
  @Input({
    required: true,
    transform: trimString,
    alias: 'customSliderValue'
    }) value = 0;
}
```

### Inputs with getters and setters

When using decorator-based inputs, a property implemented with a getter and setter can be an input:

```typescript
export class CustomSlider {
  @Input()
  get value(): number {
    return this.internalValue;
  }

set value(newValue: number) { this.internalValue = newValue; }

private internalValue = 0; }
```

You can even create a write-only input by only defining a public setter:

```typescript
export class CustomSlider {
  @Input()
  set value(newValue: number) {
    this.internalValue = newValue;
  }
private internalValue = 0; }
```

**Prefer using input transforms instead of getters and setters** if possible.

Avoid complex or costly getters and setters. Angular may invoke an input's setter multiple times, which may negatively impact application performance if the setter performs any costly behaviors, such as DOM manipulation.

## Specify inputs in the @Component decorator

In addition to the @Input decorator, you can also specify a component's inputs with the inputs property in the @Component decorator. This can be useful when a component inherits a property from a base class:

```typescript
// `CustomSlider` inherits the `disabled` property from `BaseSlider`.
@Component({
  ...,
  inputs: ['disabled'],
})
export class CustomSlider extends BaseSlider { }
```

You can additionally specify an input alias in the inputs list by putting the alias after a colon in the string:

```typescript
// `CustomSlider` inherits the `disabled` property from `BaseSlider`.
@Component({
  ...,
  inputs: ['disabled: sliderDisabled'],
})
export class CustomSlider extends BaseSlider { }
```

##  Choosing input names

Avoid choosing input names that collide with properties on DOM elements like HTMLElement. Name collisions introduce confusion about whether the bound property belongs to the component or the DOM element.

Avoid adding prefixes for component inputs like you would with component selectors. Since a given element can only host one component, any custom properties can be assumed to belong to the component.