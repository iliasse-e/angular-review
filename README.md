# Testing library

La testing library permet d'implémenter un paradigme de test qui se rapproche de l'utilisateur.
Agnostique de la logique interne, on manipule juste le visible. Cela permet d'être **lisible**, et aussi **maintenable**

Bye bye TestBed, ... Ici, `screen` devient le point central de la méthodologie de test.

Ici, on check les composants :

[Select spec file](./src/app/select/select.component.spec.ts)

## Logger

### `screen.logTestingPlaygroundURL()`

Provide a link to browser's playground to expose all elements, and you can interact with it to see the selectors you should choose for a DOM element.
For debugging using [testing-playground](https://testing-playground.com/)

```typescript
import {screen} from '@testing-library/dom'

// log entire document to testing-playground
screen.logTestingPlaygroundURL()
// log a single element
screen.logTestingPlaygroundURL(screen.getByText('test'))

```

### `screen.debug()`

Pints the DOM inside the console.
This method is essentially a shortcut for `console.log(prettyDOM())`

```typescript
import {screen} from '@testing-library/dom'

document.body.innerHTML = `
  <button>test</button>
  <span>multi-test</span>
  <div>multi-test</div>
`

// debug document
screen.debug()
// debug single element
screen.debug(screen.getByText('test'))
// debug multiple elements
screen.debug(screen.getAllByText('multi-test'))
```


### `screen.logRoles()`

rints out all ARIA roles within the tree of the given DOM element. ARIA roles are the primary selectors you should reach for in the first place.

```typescript
import {logRoles} from '@testing-library/dom'

const nav = document.createElement('nav')
nav.innerHTML = `
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>`

logRoles(nav)
```

Result :

```
navigation:
<nav />
--------------------------------------------------
list:
<ul />
--------------------------------------------------
listitem:
<li />
<li />
--------------------------------------------------
```
