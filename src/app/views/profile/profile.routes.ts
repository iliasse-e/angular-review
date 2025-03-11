import { Routes } from "@angular/router";
import { isNotDirtyGuard } from "../../is-not-dirty.guard";

export const ROUTES: Routes = [
    {
        path: 'informations',
        title: 'informations',
        data: {name: 'Jank', age: 44, lastOrder: '3 years ago'},
        loadComponent: async () => (await import("./views/information.component")).InformationComponent
    },
    {
        path: 'child-a',
        title: 'child A',
        canDeactivate: [isNotDirtyGuard],
        loadComponent: async () => (await import("./profile.component")).ChildA
    },
    {
        path: 'child-b',
        title: 'child B',
        loadComponent: async () => (await import("./profile.component")).ChildB
    },
]