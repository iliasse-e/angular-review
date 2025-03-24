# Directive

### Introduction

Les directives sont des classes qui vous permettent d'ajouter un comportement personnalisé aux éléments du DOM.

Deux types de directives :

- Directives d'attributs : elles modifient l'apparence ou le comportement d'un élément, d'un composant ou d'une autre directive. Par exemple, une directive qui change la couleur de fond d'un élément lorsqu'il est survolé.

- Directives structurelles : elles modifient la structure du DOM en ajoutant ou en supprimant des éléments. 


### 1 - Création

Decorateur, et selector (entre crochets)
```
@Directive({
  selector: '[appSurbrillance]',
})

```

### 2 - L'élément Host

Il s'agit de l'élément qui va accueillir la directive.

Deux manière de récupérer le host :

- Via host {}

- Via l'injection de ElementRef
