# Directive

### Introduction

Les directives sont des classes qui vous permettent d'ajouter un comportement personnalisé aux éléments du DOM.

Deux types de directives :

- Directives d'attributs : elles modifient l'apparence ou le comportement d'un élément, d'un composant ou d'une autre directive. Par exemple, une directive qui change la couleur de fond d'un élément lorsqu'il est survolé.

- Directives structurelles : elles modifient la structure du DOM en ajoutant ou en supprimant des éléments.

- Composants : Directive accompagnée d'un template. Les plus utilisés des directives.

#
### Directives d'attributs

Les plus connues sont : `NgClass` `NgStyle` `NgModel`

#
### Custome directive

### 1 - Création

Decorateur, et selector (entre crochets)

```typescript
@Directive({
  selector: '[appSurbrillance]',
})

```

### 2 - L'élément Host

Il s'agit de l'élément qui va accueillir la directive.

Deux manière de récupérer le host :

- Via host {}

- Via l'injection de ElementRef

### 3 - Récupérer un Event

- Relativement un event relatif au scope de l'élément host

```typescript
  host: {
    '(keyup)': 'updateColor($event)'
  }
```


- Relativement un event relatif au scope de window

```typescript
  host: {
    '(window:keyup)': 'updateColor($event)'
  }
```

- Alternative : Le décorateur HostListener

```typescript
@HostListener('click', ['$event'])
```

### X - Exercice

Créer une liste déroulante custom, associée à un champ de texte.

1- Elle s'affiche lorsqu'on renseigne le champs de texte.

2- Elle disparait lorsqu'on clic à l'extérieur.

Optionnel- Elle disparait lorsqu'on efface le texte.

Utiliser une directive (réutilisable).
