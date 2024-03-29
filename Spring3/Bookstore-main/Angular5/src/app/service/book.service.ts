import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../model/book";
import {Category} from "../model/category";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) {
  }

  createBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(API_URL + '/create', book);
  }

  findById(id: number): Observable<Book> {
    return this.httpClient.get<Book>(API_URL + '/findById/' + id);
  }

  delete(id: number): Observable<Book> {
    return this.httpClient.delete<Book>(`${API_URL}/${id}`);
  }

  getAllBook(page: number, name: string) {
    return this.httpClient.get<any>(API_URL + '/page?page=' + page + '&nameSearch=' + name);
  }

  findAllCategory(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(API_URL + '/category/list');
  }
}
