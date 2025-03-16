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

.controls


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


#### Quelques méthodes / propriétés

.get('formgroup.adress') permet de récupérer un control, et même un control imbriqué dans un formGroup

Différence value getRawValue : Si un control est disabled, il n'apparaitra pas dans form.value (même s'il possède une valeur)

.contains('formName') et addControl()


### 3 - Validateurs synchrone

Ajout validateur.

Gestion de l'affichage des erreurs dans le template.

Exploration de l'objet errors d'un control.
Exemple d'erreur : { minlength: { requiredLength: 4, actualLength: 2 } }

A noter : Les erreurs dans l'objet errors sont organisé par ordre et peut en afficher qu'un à la fois (ex: l'objet renvoie required exclusivement).


### 4 - Validateurs asynchrone

