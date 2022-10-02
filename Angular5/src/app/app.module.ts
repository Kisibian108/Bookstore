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

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'book'},
  {path: 'book', component: BookComponent },
  {path: 'book-create', component: BookCreateComponent },
  {path: 'book-edit/:id', component: BookEditComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookCreateComponent,
    BookEditComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
