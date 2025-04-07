import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service'; // Ürün modelinizin doğru yolu

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly storageKey = 'cartItems';
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.loadCartItems());
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() { }

  private loadCartItems(): CartItem[] {
    // İlk yükleme için localstorage kontrolü.
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } else {
      return [];
    }
  }
  
  // Çift sekme Sepet güncelliği için
  private saveCartItems(items: CartItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  // Aynı ürün'e +1
  addToCart(product: Product): void {
    const currentItems = this.getCartItems();
    const index = currentItems.findIndex(item => item.product.id === product.id);
    if (index !== -1) {
      currentItems[index].quantity += 1;
      this.cartItemsSubject.next([...currentItems]);
      this.saveCartItems([...currentItems]);
    } else {
      const newItems = [...currentItems, { product, quantity: 1 }];
      this.cartItemsSubject.next(newItems);
      this.saveCartItems(newItems);
    }
  }

  // Sepet price güncelliği için
  setCartItems(items: CartItem[]): void {
    this.cartItemsSubject.next(items);
    this.saveCartItems(items);
  }

  updateCartItem(productId: number, quantity: number): void {
    const currentItems = this.getCartItems();
    const index = currentItems.findIndex(item => item.product.id === productId);
    if (index !== -1) {
      currentItems[index].quantity = quantity;
      this.cartItemsSubject.next([...currentItems]);
      this.saveCartItems([...currentItems]);
    }
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    localStorage.removeItem(this.storageKey);
  }
}
