import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BookService} from '../service/book.service';
import {Book} from '../model/book';
import {CartService} from "../service/cart.service";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  id = 0;
  book: Book;
  idProduct: string;
  name: string;
  size: string;
  yearPublic: string;
  author: string;
  publisher: string;
  img: string;
  content: string;
  price: number;

  constructor(private bookService: BookService,
              private cartService: CartService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
  ) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getDanhSach(this.id);
    });
  }

  ngOnInit(): void {
  }

  getDanhSach(id: number) {
    return this.bookService.findById(id).subscribe((book ?: any) => {
      this.id = book.id;
      this.idProduct = book.idProduct;
      this.name = book.name;
      this.size = book.size;
      this.yearPublic = book.yearPublic;
      this.author = book.author;
      this.publisher = book.publisher;
      this.img = book.img;
      this.content = book.content;
      this.price = book.price;
      this.book = book;
    });
  }

  addToCart(book: Book) {
      this.cartService.addToCart(book);
  }
}
