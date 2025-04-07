import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { Order, OrderItem } from '../../models/entries/order.model';
import { Product } from '../../models/entries/product.model';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getOrderById(id).subscribe({
      next: (data) => this.order = data,
      error: (err) => {
        console.error('OrderDetailing error:', err);
        // err.error'nin description'ı alma
        if (err.error && Array.isArray(err.error) && err.error.length > 0) {
          this.errorMessage = err.error[0].description;
        }
      }
    });
  }

  cancelOrder(): void {
    if (this.order && this.order.status === 'Bekliyor') {
      this.orderService.cancelOrder(this.order.id).subscribe({
        next: () => this.ngOnInit(),
        error: (err) => {
          console.error('CancellingOrder error:', err);
          // err.error'nin description'ı alma
          if (err.error && Array.isArray(err.error) && err.error.length > 0) {
            this.errorMessage = err.error[0].description;
          }
        }
      });
    }
  }
}
