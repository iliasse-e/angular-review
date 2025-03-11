import { Routes } from "@angular/router";
import { PRODUCT_ROUTES } from "./views/products/products.routes";
import { ProfileComponent } from "./views/profile/profile.component";
import { authGuard } from "./auth.guard";
import { isAllowedGuard } from "./is-allowed.guard";

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
        title: 'products',
        children: PRODUCT_ROUTES // Possède ses propre routes (sans router outlet)
    },
    {
        path: 'my-profile',
        canActivate: [authGuard],
        canActivateChild: [isAllowedGuard],
        component: ProfileComponent, // possède son propre routeroutlet
        loadChildren: async () => (await import("./views/profile/profile.routes")).ROUTES
    },
    {
        path: 'login',
        loadComponent: async () => (await import("./views/login/login.component")).LoginComponent
    },
    {
        path: 'forbidden',
        loadComponent: async () => (await import("./views/forbidden/forbidden.component")).ForbiddenComponent
    },
    {
        path: '**',
        loadComponent: async () => (await import("./views/not-found/not-found.component")).NotFoundComponent
    }
]