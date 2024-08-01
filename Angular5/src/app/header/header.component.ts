import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../service/token-storage.service';
import {ShareService} from '../service/share.service';
import {BookService} from '../service/book.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Category} from '../model/category';
import {Book} from '../model/book';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userId: number;
  username: string;
  currentUser: string;
  customerName: string;
  role: string;
  isLoggedIn = false;
  categories: Category[] = [];
  totalQuantity = 0;
  keyword: any = '';
  data: any;
  books: Book[] = [];
  nameSearch: string;
  indexPagination: number;
  pageSize: number;
  totalPages: number;
  totalPage: Array<number>;
  pages: Array<number>;
  previousPageStyle = 'inline-block';
  nextPageStyle = 'inline-block';
  totalElements = 0;
  displayPagination = 'inline-block';
  numberOfElement = 0;
  checkedAll = false;
  number: number | undefined;

  constructor(private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private bookService: BookService,
              private router: Router,
              private title: Title) {
    this.title.setTitle('Bookstore - Online website');
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
  }

  searchForm = new FormGroup({
    nameSearch: new FormControl(),
  });

  ngOnInit(): void {
    this.getAllCategory();
    this.loadHeader();
    this.searchForm = new FormGroup({
      nameSearch: new FormControl(''),
    });
  }

  getAllCategory(): void {
    this.bookService.findAllCategory().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.currentUser = this.tokenStorageService.getUser().username;
      this.role = this.tokenStorageService.getUser().roles[0];
      this.username = this.tokenStorageService.getUser().username;
    }
    this.isLoggedIn = this.username != null;
  }

  logOut() {
    this.tokenStorageService.signOut();
  }

  getCategory(id: number) {
    this.router.navigate([`category/${id}`]);
  }

  checkRegex(nameSearch: string): boolean {
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return format.test(nameSearch);
  }

  getList() {
    this.bookService.findAll(this.indexPagination, this.nameSearch, this.pageSize).subscribe((data?: any) => {
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
  search() {
    this.nameSearch = this.searchForm.value.nameSearch;
    if (this.checkRegex(this.searchForm.value.nameSearch)) {
      this.indexPagination = 0;
      this.totalPage = new Array(0);
      this.books = [];
      this.displayPagination = 'none';
      this.checkPreviousAndNext();
      // this.toast.warning('Không được nhập kí tự đặc biệt.', 'Chú ý');
    } else {
      this.indexPagination = 0;
      this.displayPagination = 'inline-block';
      this.getList();
    }
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
}
