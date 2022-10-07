import {Category} from './category';

export interface Book {
  id?: number;
  idProduct?: string;
  name?: string;
  totalPages?: number;
  size?: string;
  yearPublic?: string;
  author?: string;
  publisher?: string;
  img?: string;
  price?: number;
  discount?: number;
  rate?: number;
  star?: number;
  category?: Category;
}
