import { inject, Injectable } from '@angular/core';
import { Product } from './app.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getProduct(id: string): Observable<Product> {
    return inject(HttpClient).get<Product>(`https://fakestoreapi.com/products/${id}`)
  }

}
