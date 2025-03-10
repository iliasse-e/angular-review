import { Routes } from "@angular/router";
import { PRODUCT_ROUTES } from "./views/products/products.routes";
import { InformationComponent } from "./views/profile/views/information.component";
import { ChildA, ChildB, ProfileComponent } from "./views/profile/profile.component";

export const ROUTES: Routes = [
    {
        path: '', redirectTo: '/home', pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: async () => (await import("./views/home/home.component")).HomeComponent
    },
    {
        path: 'products',
        children: PRODUCT_ROUTES // Possède ses propre routes (sans router outlet)
    },
    {
        path: 'my-profile',
        component: ProfileComponent, // possède son propre routeroutlet
        loadChildren: async () => (await import("./views/profile/profile.routes")).ROUTES
    },
    {
        path: 'login',
        loadComponent: async () => (await import("./views/login/login.component")).LoginComponent
    },
    {
        path: '**',
        loadComponent: async () => (await import("./views/not-found/not-found.component")).NotFoundComponent
    }
]