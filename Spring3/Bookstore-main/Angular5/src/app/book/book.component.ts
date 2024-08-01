import {Component, OnInit} from '@angular/core';
import {Book} from '../model/book';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {BookService} from '../service/book.service';
import {CartService} from "../service/cart.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  p = 0;
  books: Book[] = [];
  name: string;
  number: number;
  content: string;
  nameSearch = '';
  indexPagination = 0;
  pageSize = 8;
  itemCount = 0;
  quantity = 0;
  isAdmin = false;

  constructor(private bookService: BookService,
              private cartService: CartService,
              private router: Router,
              private toast: ToastrService,
              private title1: Title) {
    this.cartService.itemCount$.subscribe(count => {
      this.itemCount = count;
    });
    this.title1.setTitle('Book');
  }

  ngOnInit(): void {
    // const currentUser = JSON.parse(localStorage.getItem('ROLE_ADMIN'));
    // console.log(currentUser);
    // const roles = currentUser.userRoles;
    // this.isAdmin = roles.includes('ROLE_ADMIN');
    this.getList();
  }

  getList() {
    this.bookService.getAllBook(this.indexPagination, this.nameSearch).subscribe((data?: any) => {
        if (data === null) {
          this.books = [];
        } else {
          this.books = data.content;
        }
      }, error => {
        this.books = null;
      }
    );
  }

  checkRegex(codeSearch: string): boolean {
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return format.test(codeSearch);
  }

  searchBook(): void {
    if (this.checkRegex(this.nameSearch)) {
      this.books = [];
      this.toast.warning('Không được nhập kí tự đặc biệt.', 'Chú ý');
    } else {
      this.bookService.getAllBook(this.indexPagination, this.nameSearch).subscribe(response => {
          this.books = response.content;
        },
        error => {
          console.log('Error', error);
        });
    }
  }

  deleteBook(id: number) {
    this.bookService.delete(id).subscribe(() => {
      this.router.navigate(['/book']).then(r => this.ngOnInit());
    }, e => {
      console.log(e);
    });
  }

  addToCart(book: Book) {
    this.cartService.addToCart(book);
  }
}
