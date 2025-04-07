import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CartService, CartItem } from '../../services/cart.service';
import { LoadingComponent } from '../../shared/loading.component';

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, LoadingComponent],
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  orderForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = true;

  cartItems: CartItem[] = [];

  constructor(private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private cartService: CartService) { }

    ngOnInit(): void {
      this.orderForm = this.fb.group({
        customerName: ['', [Validators.required, Validators.maxLength(100)]],
        orderItems: this.fb.array([])
      });
  
      this.cartItems = this.cartService.getCartItems();
      this.cartItems.forEach(item => {
        (this.orderForm.get('orderItems') as FormArray).push(
          this.fb.group({
            productId: [item.product.id, Validators.required],
            quantity: [item.quantity, [Validators.required, Validators.min(1)]]
          })
        );
      });

      // Formdaki orderItems değişikliklerini CartService'e yansıtma
      this.orderForm.get('orderItems')?.valueChanges.subscribe((values: any[]) => {
        const updatedCartItems: CartItem[] = values.map((value, index) => {
          // Formdaki sıra ile cartItems eşleşiyor
          const existingItem = this.cartItems[index];
          return {
            product: existingItem.product,
            quantity: value.quantity
          };
        });
        this.cartService.setCartItems(updatedCartItems);
        this.cartItems = updatedCartItems;
      });
      this.isLoading = false;

    }

  createOrderItem(item?: any): FormGroup {
    return this.fb.group({
      productId: [item ? item.productId : null, Validators.required],
      quantity: [item ? item.quantity : 1, [Validators.required, Validators.min(1)]]
    });
  }

  removeOrderItem(index: number): void {
    this.orderItems.removeAt(index);
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }

  get cartCount(): number {
    return this.cartService.getCartItems().length;
  }

  get orderItems(): FormArray {
    return this.orderForm.get('orderItems') as FormArray;
  }

  get totalPrice(): number {
    return this.cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
  }

  onSubmit(): void {
    if (this.orderForm.invalid) return;

    const orderData = {
      ...this.orderForm.value,
      totalPrice: this.totalPrice
    };
    this.isLoading = true;
    this.orderService.createOrder(orderData).subscribe({
      next: (res) => {
        console.log('Order creation successful:', res);
        this.successMessage = 'Sipariş başarıyla oluşturuldu.';
        this.isLoading = false;
        this.cartService.clearCart();
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        console.error('Order creation error:', err);
        this.isLoading = false;
        this.errorMessage = err.message || 'Sipariş oluşturulamadı.';
      }
    });
  }
}
