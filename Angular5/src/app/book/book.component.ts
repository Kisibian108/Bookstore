import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Book} from '../model/book';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {BookService} from '../service/book.service';
import {Category} from '../model/category';
import {TokenStorageService} from '../service/token-storage.service';
import {ShareService} from '../service/share.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: Book[] = [];
  id: number;
  number: number;
  indexPagination = 0;
  totalPage: Array<number>;
  previousPageStyle = 'inline-block';
  nextPageStyle = 'inline-block';
  totalElements = 0;
  pageSize: number;
  displayPagination = 'inline-block';
  numberOfElement = 0;
  keyword = '';
  nameDelete: string;
  idDelete: number;

  username: string;
  currentUser: string;
  role: string;
  isLoggedIn = false;
  categories: Category[] = [];
  cartList: any = this.bookService.getCarts();
  data: any;
  nameSearch: any;
  searchForm = new FormGroup({
    nameSearch: new FormControl(),
  });

  constructor(private bookService: BookService,
              private toastrService: ToastrService,
              private title: Title,
              private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private activatedRoute: ActivatedRoute) {
    this.title.setTitle('Tất cả sách');
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.loadHeader();
    this.getAll();
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

  getAll(): void {
    this.bookService.findAll(this.indexPagination, this.keyword, this.pageSize).subscribe((result?: any) => {
      if (result === null) {
        this.totalPage = new Array(0);
        this.books = [];
        this.displayPagination = 'none';
      } else {
        this.number = result?.number;
        this.pageSize = result?.size;
        this.numberOfElement = result?.numberOfElements;
        this.books = result.content;
        this.totalElements = result?.totalElements;
        this.totalPage = new Array(result?.totalPages);
      }
      this.checkPreviousAndNext();
    });
  }

  openDelete(book: Book) {
    this.nameDelete = book.name;
    this.idDelete = book.id;
  }

  delete(idDelete: number) {
    this.bookService.delete(idDelete).subscribe(() => {
      this.ngOnInit();
      // Swal.fire('Thông báo', 'Xóa thành công', 'success');
      this.toastrService.success('Xóa thành công', 'Thông báo');
    });
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

  addToCart(book: any) {
    const index = this.cartList.findIndex((item: any) => {
      // tslint:disable-next-line:triple-equals
      return item.id == book.id;
    });

    if (index >= 0) {
      this.cartList[index].quantity += 1;
    } else {
      const cartItem: any = {
        id: book.id,
        name: book.name,
        price: book.price,
        quantity: 1,
        image: book.image
      };
      this.cartList.push(cartItem);
    }
    this.bookService.saveCarts(this.cartList);
    this.data.changeData({
      totalQuantity: this.bookService.getTotalCartQuantity()
    });
    // Swal.fire('Thông báo', 'Thêm vào giỏ hàng thành công', 'success');
    this.toastrService.success('Thêm vào giỏ hàng thành công', 'Thông báo');
  }

  checkRegex(content: string): boolean {
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return format.test(content);
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
}
