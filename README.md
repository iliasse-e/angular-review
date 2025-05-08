# Signals

A signal is a wrapper around a value that notifies interested consumers when that value changes. Signals can contain any value, from primitives to complex data structures.

You read a signal's value by calling its getter function, which allows Angular to track where the signal is used.

Signals may be either writable or read-only.

#
### Writable signals


```typescript
const value: WritableSignal<number> = signal(0)

value() // in order to read the value
```

Methods :

```typescript
value.set(1)

value.update(value => value * 2) // compute a new value from the previous one
```
#
### Computed signals

are read-only signals that derive their value from other signals. You define computed signals using the computed function and specifying a derivation


```typescript
const count: WritableSignal<number> = signal(0);

const doubleCount: Signal<number> = computed(() => count() * 2);
```

The doubleCount signal depends on the count signal. Whenever count updates, Angular knows that doubleCount needs to update as well.

Computed signals are both lazily evaluated and memoized. It's not calculated until it is read the first time, also its value is cached.

#
### Computed signal dependencies are dynamic

Only the signals actually read during the derivation are tracked. For example, in this computed the count signal is only read if the showCount signal is true:

```typescript
const showCount = signal(false);

const count = signal(0);

const conditionalCount = computed(() => {
    if (showCount()) {
        return `The count is ${count()}.`;
    } else {    
        return 'Nothing to see here!';  
    }
});
```


When you read conditionalCount, if showCount is false the "Nothing to see here!" message is returned without reading the count signal. This means that if you later update count it will not result in a recomputation of conditionalCount.

If you set showCount to true and then read conditionalCount again, the derivation will re-execute and take the branch where showCount is true, returning the message which shows the value of count. Changing count will then invalidate conditionalCount's cached value.

Note that dependencies can be removed during a derivation as well as added. If you later set showCount back to false, then count will no longer be considered a dependency of conditionalCount.

#
###  Reading signals in OnPush components

When you read a signal within an OnPush component's template, Angular tracks the signal as a dependency of that component. When the value of that signal changes, Angular automatically marks the component to ensure it gets updated the next time change detection runs.

#
### Dependent state with linkedSignal

The `linkedSignal` function lets you create a signal to hold some state that is intrinsically linked to some other state. Revisiting the example above, `linkedSignal` can replace signal

```typescript

@Component({/* ... */})
export class ShippingMethodPicker {
  shippingOptions: Signal<ShippingMethod[]> = getShippingOptions();

  // Initialize selectedOption to the first shipping option.
  selectedOption = linkedSignal(() => this.shippingOptions()[0]);

  changeShipping(index: number) {
    this.selectedOption.set(this.shippingOptions()[index]);
  }

}

```

In the exemple above, we could use :
```typescript
signal(this.shippingOptions()[0])
``` 
but we could be stucked if selectedOption changes and may contain a value that is no longer a valid option.
That's the reason why `linkedSignal` is the better alternative.

#

`linkedSignal` works similarly to signal with one key difference— instead of passing a default value, you pass a computation function, just like computed. When the value of the computation changes, the value of the `linkedSignal` changes to the computation result. This helps ensure that the `linkedSignal` always has a valid value.

#
## Accounting for previous state

In some cases, the computation for a `linkedSignal` needs to account for the previous value of the `linkedSignal`.

In the example above, `selectedOption` always updates back to the first option when `shippingOptions` changes. You may, however, want to preserve the user's selection if their selected option is still somewhere in the list. To accomplish this, you can create a `linkedSignal` with a separate _source_ and _computation_:

```typescript

@Component({/* ... */})
export class ShippingMethodPicker {

  shippingOptions = signal<ShippingMethod[]>([
    { id: 0, name: 'Ground' },
    { id: 1, name: 'Air' },
    { id: 2, name: 'Sea' },
  ]);

  selectedOption = linkedSignal<ShippingMethod[], ShippingMethod>({
    // `selectedOption` is set to the `computation` result whenever this `source` changes.
    source: this.shippingOptions,
    computation: (newOptions, previous) => {
      // If the newOptions contain the previously selected option, preserve that selection.
      // Otherwise, default to the first option.
      return (
        newOptions.find((opt) => opt.id === previous?.value.id) ?? newOptions[0]
      );
    },
  });

}
```

#
### Custom equality comparison

`linkedSignal`, as any other signal, can be configured with a custom equality function. This function is used by downstream dependencies to determine if that value of the `linkedSignal` (result of a computation) changed:

```typescript
const activeUser = signal({id: 123, name: 'Morgan', isAdmin: true});

const activeUserEditCopy = linkedSignal(() => activeUser(), {
  // Consider the user as the same if it's the same `id`.
  equal: (a, b) => a.id === b.id,
});

// Or, if separating `source` and `computation`
const activeUserEditCopy = linkedSignal({
  source: activeUser,
  computation: user => user,
  equal: (a, b) => a.id === b.id,
});
```