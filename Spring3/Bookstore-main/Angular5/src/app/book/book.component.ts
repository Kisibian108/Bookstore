import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
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
  searchForm: FormGroup;
  totalPages: number;
  number: number;
  countTotalPages: number[];
  idDelete: number;
  formCheckBox: FormGroup;
  clss: string;
  content: string;
  previousPageClass: any;
  nextPageClass: any;
  dateInSearch = '';
  codeSearch = '';
  check: string[] = [];
  editId: string;
  checkNext: boolean;
  totalPage: Array<number>;
  indexPagination = 0;
  pages: Array<number>;
  previousPageStyle = 'inline-block';
  totalElements = 0;
  pageSize = 8;
  displayPagination = 'inline-block';
  numberOfElement = 0;
  itemCount = 0;
  quantity = 0;

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
    this.getList();
    this.searchForm = new FormGroup({
      codeSearch: new FormControl(''),
    });
  }

  getList() {
    this.bookService.getAllBook(this.indexPagination, this.codeSearch, this.pageSize).subscribe((data?: any) => {
        if (data === null) {
          this.totalPage = new Array(0);
          this.books = [];
          this.displayPagination = 'none';
        } else {
          this.number = data?.number;
          this.pageSize = data?.size;
          this.numberOfElement = data?.numberOfElements;
          this.books = data.content;
          this.totalElements = data?.totalElements;
          this.totalPage = new Array(data?.totalPages);
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

  search() {
    this.codeSearch = this.searchForm.value.content;

    if (this.checkRegex(this.codeSearch)) {
      this.indexPagination = 0;
      this.totalPage = new Array(0);
      this.books = [];
      this.displayPagination = 'none';
      this.toast.warning('Không được nhập kí tự đặc biệt.', 'Chú ý');
    } else {
      this.indexPagination = 0;
      this.displayPagination = 'inline-block';
      this.ngOnInit();
    }
  }

  searchBook() {
    this.codeSearch = this.searchForm.value.codeSearch;
    if (this.checkRegex(this.searchForm.value.codeSearch)) {
      this.indexPagination = 0;
      this.totalPage = new Array(0);
      this.books = [];
      this.displayPagination = 'none';
      this.toast.warning('Không được nhập kí tự đặc biệt.', 'Chú ý');
    } else {
      this.indexPagination = 0;
      this.displayPagination = 'inline-block';
      this.getList();
    }
  }
  deleteBook(id: number) {
    this.bookService.delete(id).subscribe(() => {
      this.router.navigate(['/book']).then(r => this.ngOnInit())  ;
    }, e => {
      console.log(e);
    });
  }

  addToCart(book: Book) {
    this.cartService.addToCart(book);
  }
}
