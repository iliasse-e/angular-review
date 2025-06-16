# Description

Les operateurs ont pour but de gérer les données, ils sont de différentes catégories :

- Création
- Transformation
- Filtre
- Gestion d'erreur
- Condition
- Utilitaire


#### 1 - `map`

Est une fonction de transformation de la valeur de l'observable

#### 2 - `concatMap`

Utilisé pour transformer chaque valeur en une observable, puis concatèner les observables dans l'ordre ou elles ont étés créés. `concatMap` attend que l'obs précédente soit terminé avant de souscrire au suivant.

```typescript
from([1, 2, 3]).pipe(
    concatMap((id) => of(id).pipe(delay(1000))),
).subscribe(val => console.log(val)) // émet 1, puis 2, puis 3, avec un délai de 1s entre chaque valeur
```

#### 3 - `mergeMap`

similaire à `concatMap` mais au lieu d'attendre que l'observable précédente soit terminée, il souscrit à tous les observables en même temps et les fusionne en un seul observable.
Signifie que les valeurs peuvent être émises dans un ordre différent de celui dans les observables ont été créés.

```typescript
from([1, 2, 3]).pipe(
    mergeMap((id) => of(id).pipe(delay(1000))),
).subscribe(val => console.log(val)) // émet 1, puis 2, puis 3 en même temps après un délai de 1s
```

#### 4 - `switchMap`

Est utilisé pour transformer chaque valeur émise par une observable par une autre observable, puis annule l'observable précédente si une nouvelle valeur est émise avant que l'observable ne soit terminé.

```typescript
from([1, 2, 3]).pipe(
    swichtMap((id) => of(id).pipe(delay(1000))),
).subscribe(val => console.log(val)) // émet 3
```