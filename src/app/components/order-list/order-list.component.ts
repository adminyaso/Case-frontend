import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Order } from '../../models/entries/order.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  errorMessage: string = '';

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (data) => this.orders = data,
      error: (err) => {
        console.error('OrderListing error:', err);
        // err.error'nin description'ı alma
        if (err.error && Array.isArray(err.error) && err.error.length > 0) {
          this.errorMessage = err.error[0].description;
        }
      }
    });
  }
}
