import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, Inject, inject, OnDestroy, output } from '@angular/core';
import { fromEvent, Subscription, tap } from 'rxjs';

@Directive({
  selector: '[clickOutside]',
  /**
   * Autre manière est d'utiliser *

   host: {
    '(document:click)': 'checkClick($event)'
  }

  Puis écrire la méthode checkClick, et les blocks ngAfterviewInit et ngOnDestroy peuvent être supprimés
   */
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy {

  private el = inject(ElementRef); // Fait référence à l'élément sur lequel la directive est placée

  constructor(@Inject(DOCUMENT) private document = inject(Document)) {}

  clickOutside = output<void>();

  clickSubscription: Subscription | undefined;

  ngAfterViewInit(): void {
    this.clickSubscription = fromEvent(this.document, 'click') // On écoute chaque clic sur le document
    .pipe(
      tap((event) => !this.isInside(event.target as HTMLElement) && this.clickOutside.emit()), // Emite dès que le click est hors de l'élément
    )
    .subscribe();
  }

  isInside(elementToCheck: HTMLElement): boolean {
    return (
      elementToCheck === this.el.nativeElement ||
      this.el.nativeElement.contains(elementToCheck)
    );
  }

  ngOnDestroy(): void {
    this.clickSubscription?.unsubscribe();
  }

}
