import {Component, OnInit} from '@angular/core';
import {Book} from "../model/book";
import {CartService} from "../service/cart.service";
import {render} from "creditcardpayments/creditCardPayments";

@Component({
  selector: 'app-book-cart',
  templateUrl: './book-cart.component.html',
  styleUrls: ['./book-cart.component.css']
})
export class BookCartComponent implements OnInit {

  constructor(private cartService: CartService) {
    render({
      id: '#myPaypalButtons',
      currency: 'USD',
      onApprove(details: any): void {
        alert('Thanh toan thanh cong');
      }, value: '100.00'
    });
  }

  cartItems: Book[] = [];
  totalPrice = 0;

  ngOnInit(): void {
    this.calculateTotalPrice();
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
  }

  decreaseQuantity(book: Book) {
    if (book.quantity > 1) {
      book.quantity--;
      this.updateTotalPrice();
      this.updateLocalStorage();
    }
  }

  increaseQuantity(book: Book) {
    book.quantity++;
    this.updateTotalPrice();
    this.updateLocalStorage();

  }

  updateLocalStorage(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  deleteBook(book: Book): void {
    const index = this.cartItems.indexOf(book);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
    this.updateTotalPrice();
    this.updateLocalStorage();
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartService.calculateTotal();
  }

  updateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }


}
