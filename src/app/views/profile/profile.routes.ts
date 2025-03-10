import { Routes } from "@angular/router";

export const ROUTES: Routes = [
    {
        path: 'informations',
        loadComponent: async () => (await import("./views/information.component")).InformationComponent
    },
    {
        path: 'child-a',
        loadComponent: async () => (await import("./profile.component")).ChildA
    },
    {
        path: 'child-b',
        loadComponent: async () => (await import("./profile.component")).ChildB
    },
]