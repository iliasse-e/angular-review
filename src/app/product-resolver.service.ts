import { ResolveFn } from "@angular/router";
import { Product } from "./app.component";
import { Observable } from "rxjs";
import { ProductService } from "./product.service";
import { inject } from "@angular/core";

export const productResolver: ResolveFn<Product> = (
    route,
    state
  ): Observable<Product> => {
    const productService = inject(ProductService);
    return productService.getProduct(route.params['id']); // Récupère l'id qui est donné en queryParam
  };