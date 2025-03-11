# Ressource API



#### Deux propriétés à déclarer en objet de la méthode resource() :

- request : correspond au signal (ou signals via Array) auquel la méthode se mettra à jour (réactive)
- loader : La source de donnée que l'on souhaite charger (via fetch)

#### resource() fournit un ensemble de getters :

        .value(),
        .error(),
        .isLoading(),
        .status()
