# Signals

A signal is a wrapper around a value that notifies interested consumers when that value changes. Signals can contain any value, from primitives to complex data structures.

You read a signal's value by calling its getter function, which allows Angular to track where the signal is used.

Signals may be either writable or read-only.


### Writable signals


```
const value: WritableSignal<number> = signal(0)

value() // in order to read the value
```

Methods :

```
value.set(1)

value.update(value => value * 2) // compute a new value from the previous one
```

### Computed signals

are read-only signals that derive their value from other signals. You define computed signals using the computed function and specifying a derivation


```
const count: WritableSignal<number> = signal(0);
const doubleCount: Signal<number> = computed(() => count() * 2);
```

The doubleCount signal depends on the count signal. Whenever count updates, Angular knows that doubleCount needs to update as well.

Computed signals are both lazily evaluated and memoized. It's not calculated until it is read the first time, also its value is cached.