# Accepting data with input properties


### Input function

`input` is a function of type `InputFunction`

The `input` function returns an `InputSignal`. You can read the value by calling the signal.

Signals created by the input function are read-only.


###  Required inputs

You can declare that an input is required by calling input.required instead of input:

```typescript
value = input.required<number>();
```

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