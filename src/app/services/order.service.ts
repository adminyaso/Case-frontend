import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order} from '../models/entries/order.model';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService{
  private apiUrl = environment.apiUrl + '/order';

  constructor(private http: HttpClient) { super(); }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl).pipe(
      catchError(err => this.handleError(err)));
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => this.handleError(err)));
  }

  createOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, orderData, { responseType: 'text' }).pipe(
      catchError(err => this.handleError(err)));
  }

  cancelOrder(id: number): Observable<void> {
    const payload = { id: id, status: "IptalEdildi" };
    return this.http.put<void>(`${this.apiUrl}/update`, payload).pipe(
      catchError(err => this.handleError(err)));
  }
  
}
