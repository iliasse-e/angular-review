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

