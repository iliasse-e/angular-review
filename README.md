# Forms

### Introduction

Template driven - Data driven (création du modèle dans la classe pour ensuite le binder au template).

Chaque control est composé d'une value, d'un status et d'un validateur.

On peut imbriquer des formulaires dans un formArray


### 1 - Création

On importe ReactiveFormsModule

1- création d'un groupe via new FormGroup()

2- Dans un objet, je donne la propriété ainsi que new FormControl()

** Le formControl prend la valeur, et un objet de configuration (à l'intérieur le validateur, ...)

3- On bind le formulaire au template via la directive formGroup ainsi que les control via la directive formControlName

** Ce binding empêche le reload de la page une fois qu'on submit le formulaire

4- On bind l'Event (submit) à une fonction

### 2 - Les classes héritant de AbstractControl

#### API de FormGroup

##### Méthodes

.addControl()

.removeControl()

.get()

.setValue()

.patchValue()

.contains()

##### Propritétés

.value

.status

.valid

.pristine

.touched


#### API de FormControl

##### Méthodes

.setValue()

.patchValue()

.reset()

.disable()

.enable()

.markAsTouched()

.markAsUntouched()

.updateValueAndValidity()

##### Propritétés

.value

.status

.valid

.pristine

.touched

.dirty
