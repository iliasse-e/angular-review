# Signal Forms

## Introduction

Avec Signal Forms, le modèle du formulaire est défini par un signal synchronisé automatiquement avec les champs du formulaire auxquels il est lié, offrant une expérience ergonomique avec une sécurité de type complète. Une validation puissante, centralisée et basée sur des schémas est intégrée.

Les nouveautés se trouvent dans le paquet `'@angular/forms/signals'`.

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

On relie les <input> avec une simple directive [field] et non plus avec les directives multiples de `ReactiveForm`.

```typescript
<input type="text" [field]="profileForm.firstName">
```
### 4. Ajout de validateurs

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

