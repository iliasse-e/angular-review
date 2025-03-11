import { Routes } from '@angular/router';
import { productResolver } from '../../product-resolver.service';

export const PRODUCT_ROUTES: Routes = [
    {
        path: ':id', // Autant de paramètres que l'on souhaite (ex: "/:id/:age")
        title: 'Detail',
        resolve: {
            product: productResolver // injection dynamique de donnée
        },
        loadComponent: async () => (await import('./views/detail/detail.component')).DetailComponent
    },
    {
        path: '',
        loadComponent: async () => (await import('../products/products.component')).ProductsComponent
    },
]