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
  category?: Category;
}
