import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="logo" (click)="navigateHome()">
        <img src="https://www.techmax.com.tr/images/texchmax.png" alt="Site Logo" />
        <span class="site-name">WebCase</span>
      </div>
      <nav class="navigation">
        <a (click)="navigateHome()">Ürünler</a>
        <a (click)="goToCart()" >Sepet ({{ cartCount }})</a>
        <a routerLink="/orders" *ngIf="isLoggedIn()">Siparişlerim</a>
        <a (click)="authService.logout()" *ngIf="isLoggedIn()">Logout</a>
        <a routerLink="/login" *ngIf="!isLoggedIn()">Login</a>
      </nav>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      background-color: #f8f9fa;
      border-bottom: 1px solid #dee2e6;
    }
    .logo {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .logo img {
      height: 40px;
      margin-right: 10px;
    }
    .site-name {
      font-size: 1.5em;
      font-weight: bold;
    }
    .navigation a {
      cursor: pointer;
      margin-left: 40px;
      text-decoration: none;
      color: #007bff;
    }
    .navigation a:hover {
      text-decoration: underline;
    }
  `]
})
export class HeaderComponent {
  constructor(private router: Router, 
    public authService: AuthService,
    private cartService: CartService) { }

  navigateHome(): void {
    this.router.navigate(['/']);
  }

  // Auth servisten kontrol edilebilir...
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get cartCount(): number {
    return this.cartService.getCartItems().length;
  }

  goToCart(): void {
    this.router.navigate(['/new-order']);
  }
}
