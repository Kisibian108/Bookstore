import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Book} from '../model/book';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {BookService} from '../service/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  p = 0;
  books: Book[] = [];
  name: string;
  code: string;
  dateIn: string;
  status: string;
  page = 0;
  searchForm: FormGroup;
  totalPages: number;
  number: number;
  countTotalPages: number[];
  idDelete: number;
  formCheckBox: FormGroup;
  nameDelete: Book[] = [];
  ids: number[] = [];
  msg: string;
  clss: string;
  content: string;
  previousPageClass: any;
  nextPageClass: any;
  dateInSearch = '';
  statusSearch = '';
  codeSearch = '';
  check: string[] = [];
  editId: string;
  deleteList: Book[] = [];
  checkNext: boolean;
  checkPrevious: boolean;
  totalPage: Array<number>;
  indexPagination = 0;
  pages: Array<number>;
  previousPageStyle = 'inline-block';
  nextPageStyle = 'inline-block';
  totalElements = 0;
  pageSize = 8;
  displayPagination = 'inline-block';
  numberOfElement = 0;
  checkedAll = false;
  pigDeleted: Book;

  constructor(private bookService: BookService,
              private router: Router,
              private toast: ToastrService,
              private title1: Title) {
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
        this.checkPreviousAndNext();
      }, error => {
        this.books = null;
      }
    );
  }

  previousPage(event: any) {
    event.preventDefault();
    this.indexPagination--;
    this.ngOnInit();
  }

  nextPage(event: any) {
    event.preventDefault();
    this.indexPagination++;
    this.ngOnInit();
  }

  checkPreviousAndNext() {
    if (this.indexPagination === 0) {
      this.previousPageStyle = 'none';
    } else if (this.indexPagination !== 0) {
      this.previousPageStyle = 'inline-block';
    }
    if (this.indexPagination < (this.totalPage.length - 1)) {
      this.nextPageStyle = 'inline-block';
    } else if (this.indexPagination === (this.totalPage.length - 1) || this.indexPagination > (this.totalPage.length - 1)) {
      this.nextPageStyle = 'none';
    }
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
      this.checkPreviousAndNext();
      this.toast.warning('Không được nhập kí tự đặc biệt.', 'Chú ý');
    } else {
      this.indexPagination = 0;
      this.displayPagination = 'inline-block';
      this.ngOnInit();
    }
  }

  totalElement($event: any) {
    this.deleteList = [];
    switch ($event.target.value) {
      case '5':
        this.pageSize = 5;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
      case '10':
        this.pageSize = 10;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
      case '15':
        this.pageSize = 15;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
      case 'full':
        this.pageSize = this.totalElements;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
    }
  }

  searchPig() {
    this.codeSearch = this.searchForm.value.codeSearch;
    if (this.checkRegex(this.searchForm.value.codeSearch)) {
      this.indexPagination = 0;
      this.totalPage = new Array(0);
      this.books = [];
      this.displayPagination = 'none';
      this.checkPreviousAndNext();
      this.toast.warning('Không được nhập kí tự đặc biệt.', 'Chú ý');
    } else {
      this.indexPagination = 0;
      this.displayPagination = 'inline-block';
      this.getList();
    }
  }

  showDelete(book: Book) {
    this.idDelete = book.id || 0;
    this.name = book.name;
  }

  deleteBook(id: number) {
    this.bookService.delete(id).subscribe(() => {
      this.router.navigate(['/book']).then(r => this.ngOnInit())  ;
    }, e => {
      console.log(e);
    });
  }
}
