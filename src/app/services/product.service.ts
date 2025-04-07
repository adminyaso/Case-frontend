import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/entries/product.model';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService{
  private apiUrl = environment.apiUrl + '/product';

  constructor(private http: HttpClient) { super(); }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      catchError(err => this.handleError(err))
    );
  }
}
