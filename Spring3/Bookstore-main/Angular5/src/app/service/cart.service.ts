import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {Book} from "../model/book";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: Book [] = [];
  private cartSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  private itemCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public itemCount$ = this.itemCountSubject.asObservable();
  private storageKey = 'cartItems';

  constructor() {
    const storedCartItems = localStorage.getItem(this.storageKey);
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
  }

  getCartItems() {
    return this.cartSubject.asObservable();
  }

  addToCart(book: Book) {
    const existingBook = this.cartItems.find(item => item.id === book.id);

    if (existingBook) {
      existingBook.quantity++;
    } else {
      this.cartItems.push({...book, quantity: 1});
      this.cartSubject.next(this.cartItems);
      this.itemCountSubject.next(this.cartItems.length);
    }
    this.calculateTotal();
    this.updateLocalStorage();
  }

  updateLocalStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item ) => total + (item.price * item.quantity), 0);
  }
}
