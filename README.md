# Component communication

Key words : Input signals, init value, transform, function.

### Input signals

The input function allows declaration of Angular inputs in directives and components.

There are two variants of inputs that can be declared:

    - Optional inputs with an initial value.
    - Required inputs that consumers need to set.

```typescript
function input<T>(): InputSignal<T | undefined>;
```

### Required

From Angular 16, we could use the property `required: true` in the option object in the @Input decorator.

From latests versions, we can use the following syntax :

```typescript
input.required()
```

### Init value

For this case, we don't transform the data :

```typescript
function input<T>(initialValue: T, opts?: InputOptionsWithoutTransform<T> | undefined): InputSignal<T>;
```

If we want to transform data, we'll use this interface :

```typescript
function input<T, TransformT>(initialValue: T, opts: InputOptionsWithTransform<T, TransformT>): InputSignalWithTransform<T, TransformT>;
```

We'll take an exemple on the next section ...


### Transform input data

With `InputSignalWithTransform` :

```typescript
disabled = input(false, {    transform: (v: string|boolean) => convertToBoolean(v),  }); // InputSignalWithTransform<boolean, string|boolean>
```

Angular provides us some transform methods as `numberAttribute` or `booleanAttribute` available in @angular/core

[To go further on input signal](https://angular.dev/api/core/input)

### model()

...
