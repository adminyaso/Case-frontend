import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

export interface Order {
  id: number;
  customerName: string;
  orderDate: string;
  updatedTime: string;
  status: string;
  totalPrice: number;
  orderItems: OrderItem[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://localhost:44391/api/order';

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
