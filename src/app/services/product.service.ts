import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Ürün modeli
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // API url
  private apiUrl = 'https://localhost:44391/api/product';

  constructor(private http: HttpClient) { }

  // GET Product
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
