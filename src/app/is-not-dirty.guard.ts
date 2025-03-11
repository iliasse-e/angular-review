import { CanDeactivateFn } from '@angular/router';

// Utilise une interface pour découpler le guard du composant
// https://guide-angular.wishtack.io/angular/routing/route-guards
export interface IsDirty {
  isDirty(): boolean;
}

export const isNotDirtyGuard: CanDeactivateFn<IsDirty> = (component: IsDirty, currentRoute, currentState, nextState) => {
  return component.isDirty();
};
