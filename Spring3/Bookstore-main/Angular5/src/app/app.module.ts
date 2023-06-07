import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import {RouterModule, Routes} from '@angular/router';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {LoginComponent} from './security/login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookCartComponent } from './book-cart/book-cart.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'book'},
  {path: 'book', component: BookComponent },
  {path: 'book-create', component: BookCreateComponent },
  {path: 'book-edit/:id', component: BookEditComponent},
  {path: 'book-detail/:id', component: BookDetailComponent},
  {path: 'book-cart', component: BookCartComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookCreateComponent,
    BookEditComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    BookDetailComponent,
    BookCartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
