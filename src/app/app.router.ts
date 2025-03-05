import { Routes } from "@angular/router";

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: async () => (await import("./home/home.component")).HomeComponent
    },
    {
        path: 'products',
        loadComponent: async () => (await import('./products/products.component')).ProductsComponent
    },
    {
        path: 'my-profile',
        loadComponent: async () => (await import("./profile/profile.component")).ProfileComponent
    },
    {
        path: 'login',
        loadComponent: async () => (await import("./login/login.component")).LoginComponent
    }
]