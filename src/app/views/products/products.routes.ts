import { Routes } from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
    {
        path: ':id', // Autant de paramètres que l'on souhaite (ex: "/:id/:age")
        title: 'Detail',
        loadComponent: async () => (await import('./views/detail/detail.component')).DetailComponent
    },
    {
        path: '',
        loadComponent: async () => (await import('../products/products.component')).ProductsComponent
    },
]