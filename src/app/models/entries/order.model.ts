// src/app/models/order.model.ts
import { Product } from './product.model';

export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

export interface Order {
  id: number;
  customerName: string;
  orderDate: Date;
  updatedTime: Date;
  totalPrice: number;
  status: string;
  orderItems: OrderItem[];
}

