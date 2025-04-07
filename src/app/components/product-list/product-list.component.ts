import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/entries/product.model';
import { LoadingComponent } from '../../shared/loading.component';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  errorMessage: string = '';
  cart: Product[] = [];
  isLoading: boolean = true;

  constructor(
    private productService: ProductService,
    public authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {this.products = data;
      this.isLoading = false;},
      error: (err) => {
        console.error('Get Product error:', err);
        this.isLoading = false;
        this.errorMessage = err.message || 'Ürün listesi getirilemedi.';
      }
    });
  }
  
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  get cartCount(): number {
    return this.cartService.getCartItems().length;
  }

  goToCart(): void {
    this.router.navigate(['/new-order']);
  }
}
