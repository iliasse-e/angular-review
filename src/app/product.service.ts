import { Injectable, signal } from "@angular/core";

@Injectable({providedIn: "root"})
export class ProductService {
    products = signal<string[]>([]);

    add(product: string) {
        this.products.update(products => [...products, product]);
    }

    delete(index: number) {
        this.products.update(products => products.filter(product => products.indexOf(product) != index));
    }
}