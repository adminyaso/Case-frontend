import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order} from '../models/entries/order.model';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.apiUrl + '/order';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  createOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, orderData, { responseType: 'text' });
  }

  cancelOrder(id: number): Observable<void> {
    const payload = { id: id, status: "IptalEdildi" };
    return this.http.put<void>(`${this.apiUrl}/update`, payload);
  }
  
}
