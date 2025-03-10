# Angular Router


### 1 - Mise en place du routing

Création d'un fichier route.

Importer provideRouter dans le fichier app.config.ts et lui donner les routes.

Utilisation de la directive routerLink.

Utilisation de la directive routerLinkActive et routerLinkActiveOptions.

Mise en place du lazy loading.


### 2 - Navigation

Navigation (navigate & navigateByUrl).

Wild card management (404 not found).

Login feature.

Redirection (redirectTo).

Ajout de query param et de l'ancre dans l'url (queryParam & fragment).
Possible aussi avec scrollToAnchor() via méthodes ViewportScroller.


### 3 - Parametres de route

Utilisation de :id dans le chemin, de la directive routerLink.

Utilisation de withComponentInputBinding() comme provider pour binder l'input d'un composant avec l'id de la route.


### 4 - Nested routes

Création de routes imbriquées via la propriété children ou loadChildren.

Utilisation du router-outler dans le composant accueillant une route imbriqué (child route).

Séparation des child routes dans un fichier séparé.

Revue de l'architecture des dossiers (ajout de dossier views).