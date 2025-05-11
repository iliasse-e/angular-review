# RxJS

#
### Observable froid et chaud

La différence entre un observable froid et chaud en RxJS est que les observables froids produisent des valeurs indépendamment de l'existence de souscriptions, tandis que les observables chauds ne produisent des valeurs que lorsqu'il y a des souscriptions actives.

```javascript
// observable froid
const coldObservable = new Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
});

// observable chaud
const hotObservable = new Subject();
hotObservable.next(1);
hotObservable.next(2);
hotObservable.next(3);
hotObservable.complete();
```

Si on souscrit à l'observable chaud après qu'elle soit `complete()`, on ne recevra aucune valeur.

#
### Gestion de la souscription

#### 1 - `Unsubscribe` dans `ngOnDestroy`
On profite généralement du "Lifecycle Hook" `ngOnDestroy` pour déclencher l'unsubscribe.

```typescript
private _bookListSubscription: Subscription;

constructor(private _bookRepository: BookRepository) {
}

ngOnInit() {
    this._bookListSubscription = this._bookRepository.getBookList()
        .subscribe(bookList => this.bookList = bookList);
}

ngOnDestroy() {
    this._bookListSubscription.unsubscribe();
}
```


#### 2 - Unsubscribe avec `takeUntil`

```typescript
export class BookSearchComponent implements OnDestroy, OnInit {

    bookList: Book[];

    private _isDead$ = new Subject();

    constructor(private _bookRepository: BookRepository) {
    }

    ngOnInit() {
        this._bookRepository.getBookList()
            .pipe(takeUntil(this._isDead$))
            .subscribe(bookList => this.bookList = bookList);
    }

    ngOnDestroy() {
        this._isDead$.next();
    }

}
```

#### 3 - Unsubscribe avec le Pipe `async`

#
### Créer une Observable

```javascript
const observable = new Observable((observer) => {
  let count = 0;
  setInterval(() => {
    observer.next(count);
    count++;
  }, 1000);
});
// On doit y souscrire ensuite pour consommer les données
```