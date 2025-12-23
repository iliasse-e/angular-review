# Signal Forms

## Introduction

Avec Signal Forms, le modèle du formulaire est défini par un signal synchronisé automatiquement avec les champs du formulaire auxquels il est lié, offrant une expérience ergonomique avec une sécurité de type complète. Une validation puissante, centralisée et basée sur des schémas est intégrée.

Les nouveautés se trouvent dans le paquet `'@angular/forms/signals'`.

- [La documentation officielle](https://angular.dev/guide/forms/signals/overview)

- [L'article de Angular love](https://angular.love/signal-forms-in-angular-21-complete-guide)

### 1. On créé un signal avec l'ensemble des champs

```typescript
interface LoginData {
  email: string;
  password: string;
}
const loginModel = signal<LoginData>({
  email: '',
  password: '',
});
```
### 2. On créé un `FieldTree` grâce à la méthode `form()`

On utilise la méthode `form()` qui prend en paramètre le signal afin de créer un (formulaire) de type `FieldTree` (Generic Type)

```typescript
const loginForm = form(loginModel);

// Access fields directly by property name
loginForm.email;
loginForm.password;
```
### 3. la directive `[field]`

On relie les <input> avec une simple directive ``[field]`` et non plus avec les directives multiples de `ReactiveForm`.

```typescript
<input type="text" [field]="profileForm.firstName">
```
### 4. Validateurs

### Validateurs prédéfinis

Il a les validateurs classiques, qu'on déclare en même temps que le formulaire :

```typescript
import {form, Field, required, email} from '@angular/forms/signals';

loginForm = form(this.loginModel, (fieldPath) => {
  required(fieldPath.email, {message: 'Email is required'});
  email(fieldPath.email, {message: 'Enter a valid email address'});
});
```

Puis on peut accéder dans le fichier .ts ou dans le template à ces validateurs (ex: `loginForm().errors()` dans le template).

Le formulaire offrira des méthodes accesseurs comme : `.invalid()`, `.dirty()`, `.errors()`, `.touched()`, similaires au ``FormControl`` 
(mais aussi des nouvelles comme `.hidden()`, `.disabledReasons()`).

Ainsi que des méthodes mutateurs comme : `.reset()`, `.markAsDirty()`.

### Validateurs customs

On utilise la fonction `validate()` pour créer un validateur custom.
Celui ci renvoi un objet d'erreur ou ``undefined``/``null``

```ts
const registrationForm = form(this.model, (f) => {
  // Custom validator - function receives context with value
  validate(f.username, ({ value }) => {
    const username = value();
    if (username.includes(' ')) {
      return customError({ kind: 'no-spaces', message: 'Name cannot contain spaces' });
    }
    return undefined; // no error
  });
```

Le contexte de validation nous donne accès à :

- ``value()`` la valeur du champ
- ``valueOf(path)`` la valeur d'une autre champ
- ``state`` l'état du champ
- ``stateOf(path)`` l'état d'un autre champ

Le réel gain des signal form, c'est leur réactivité, qui permet de s'abstenir d'écrire du code complexe. Nul besoin d'utiliser de la souscription ou de l'appel de `updateValueAndValidity()` (détail dans l'article de angular love).

### 5. Création de signaux dérivés

Et comme tout est réactif sans devoir écrire une tonne de code complexe, voici le minimalisme que permet l'API signals.

```typescript
isFirstNameValid = computed(() => this.profileForm.firstName().valid())
```

### 6. Disable

On peut utiliser les validateurs pour appliquer une opération de désactivation.

```ts
export class Order {
  orderModel = signal({
    total: 25,
    couponCode: ''  
  }) 
  
  orderForm = form(this.orderModel, schemaPath => {
    disabled(schemaPath.couponCode, ({valueOf}) => valueOf(schemaPath.total) < 50)  
    }
  )
}
```

```ts
@if (orderForm.couponCode().disabled()) {
  <p class="info">Coupon code is only available for orders over $50</p>
}
```
## submit

Un exemple dans le fichier [app.component.ts](./src/app/app.component.ts)
