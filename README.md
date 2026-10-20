# Web Worker Lab — Performance & Thread Isolation en Angular

Ce projet est un laboratoire d'apprentissage et de démonstration conçu pour comprendre l'utilisation des **Web Workers** dans une application Angular moderne (Standalone Components, Signals).

---

## 🧠 Qu'est-ce qu'un Web Worker et à quel problème répond-il ?

### Le Problème : Le Single-Thread JavaScript
Par défaut, JavaScript s'exécute sur un **unique fil d'exécution (le Main Thread / Thread UI)** dans le navigateur. Ce même thread gère à la fois :
1. L'exécution de ton code applicatif (Angular, logique métier).
2. Le rendu visuel de l'interface (DOM, CSS, animations à 60 FPS).
3. La gestion des interactions utilisateur (clics, scrolls, saisie clavier).

**La conséquence critique :** Lorsqu'un calcul lourd est exécuté sur le thread principal (ex: parsing, validation et filtrage de 100 000 lignes de données CSV, chiffrement, traitement d'image), **le navigateur gèle (freeze)**. Les animations s'arrêtent, le compteur de FPS chute à 0, et l'utilisateur ne peut plus interagir avec l'application.

---

### La Solution : Le Web Worker
Un **Web Worker** est un script qui s'exécute en arrière-plan sur un **thread séparé** du thread principal. 

* **Isolation totale :** Le Worker effectue les calculs lourds en tâche de fond. Le thread principal reste entièrement libre et réactif.
* **Communication par messages :** Le composant Angular envoie les données brutes au Worker via `postMessage()`. Le Worker traite les données et renvoie le résultat par le même canal une fois le calcul terminé.
* **Absence d'accès au DOM :** Le Worker n'a aucun accès direct au DOM (`window`, `document`) ni aux services Angular injectables. Il se concentre exclusivement sur de la pure logique algorithmique et de traitement de données.

---

## 🛠️ Description de l'Application (Le Laboratoire)

Cette mini-application Angular permet de comparer en direct l'impact d'un traitement lourd (100 000 lignes de CSV) selon qu'il est exécuté de manière synchrone sur le thread principal ou de façon isolée dans un Web Worker.

### Fonctionnalités de l'interface :
1. **Compteur de FPS en direct :** Permet de mesurer la santé et la fluidité du thread principal (UI). Si les FPS descendent en dessous de 30, l'interface montre des signes de gel.
2. **Testeur d'Interaction UI :** Un bouton interactif à cliquer pendant le calcul. Si le thread est bloqué, le bouton ne répond plus du tout.
3. **Sélecteur de Mode (Comparateur) :**
   * **Avec Web Worker :** Le fichier est délégué au thread séparé. L'interface reste parfaitement fluide à 60 FPS pendant toute la durée du traitement.
   * **Sans Worker (Main Thread) :** Le calcul est forcé sur le fil principal, provoquant un gel total et instantané de l'interface.
4. **Indicateurs de performance :** Affiche le temps exact d'exécution en millisecondes et un rapport détaillé des lignes valides par rapport aux erreurs détectées (SKU invalides, prix négatifs ou erronés).

---

## 📂 Structure du Code

* **`csv-parser.worker.ts`** : Le script du Web Worker qui reçoit le fichier texte brut, boucle sur les 100 000 lignes, applique les règles métiers et retourne les résultats propres.
* **`csv-demo.component.ts`** : Le composant Angular gérant l'UI, le suivi des FPS via `requestAnimationFrame`, l'instanciation du Worker et le comparateur de performance.

## Communiquer du Thread Principal vers le Worker


### 1. Le principe du "Message Passing" (Le Protocole)

C'est un échange de messages bruts (un peu comme une API REST locale ou des lettres dans une boîte aux lettres) :

* **Du Thread Principal vers le Worker :** On appelle `worker.postMessage(donnees)`. Le navigateur sérialise les données (généralement via un algorithme de clonage structuré), les copie et les envoie au worker.
* **Du Worker vers le Thread Principal :** Dans le fichier du worker, on appelle `postMessage(resultat)` pour renvoyer la réponse, et le composant l'écoute via `worker.onmessage = (event) => { ... }`.

---

### 2. Visualisation de l'échange

```text
[ Composant Angular (Thread UI) ]                    [ Web Worker (Thread Séparé) ]
               │                                                    │
               │── 1. worker.postMessage(grosFichierCSV) ──────────>│
               │                                                    │ (Travail lourd en arrière-plan :
               │    (L'UI reste 100% fluide,                        │  parsing, boucles, regex...)
               │     l'utilisateur peut cliquer)                    │
               │                                                    │
               │<── 2. postMessage({ validProducts, errors }) ──────│
               │
   [ Réception & Mise à jour des Signals ]

```

---

### 3. Est-ce qu'on peut envoyer n'importe quoi ?

Presque ! Tu peux envoyer :

* Des chaînes de caractères (du texte brut comme notre CSV).
* Des objets JavaScript, des tableaux (`Array`), des objets `JSON`.
* **Des données binaires performantes (Transferable Objects) :** Pour les fichiers très lourds, au lieu de copier les données en mémoire (ce qui peut être un peu lent), tu peux les **transférer** directement au worker (le thread principal s'en dessaisit instantanément).

---

### 4. Résumé des règles d'or du protocole

1. **C'est asynchrone :** Tu n'attends pas un retour immédiat sous forme de fonction de retour (`return`). Tu envoie un message et tu t'abonnes à la réponse future.
2. **C'est par copie (par défaut) :** Les données que tu envoies au worker sont clonées. Le worker modifie sa copie, et renvoie une nouvelle copie. Ils ne partagent pas la même mémoire vive (sauf cas très avancés avec des `SharedArrayBuffer`).
3. **Zéro DOM :** Le worker ne peut pas aller chercher un élément HTML, modifier une classe CSS ou lire un cookie. Il ne fait que **transformer des données d'entrée en données de sortie**.