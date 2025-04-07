import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { Order, OrderItem } from '../../models/entries/order.model';
import { Product } from '../../models/entries/product.model';
import { LoadingComponent } from '../../shared/loading.component';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getOrderById(id).subscribe({
      next: (data) => {this.order = data;
        this.isLoading = false;},
      error: (err) => {
        console.error('OrderDetailing error:', err);
        this.isLoading = false;
        this.errorMessage = err.message || 'Sipariş detayı getirilemedi.';
      }
    });
  }

  cancelOrder(): void {
    if (this.order && this.order.status === 'Bekliyor') {
      this.orderService.cancelOrder(this.order.id).subscribe({
        next: () => this.ngOnInit(),
        error: (err) => {
          console.error('CancellingOrder error:', err);
          this.errorMessage = err.message || 'Sipariş iptal edilemedi.';
        }
      });
    }
  }
}
