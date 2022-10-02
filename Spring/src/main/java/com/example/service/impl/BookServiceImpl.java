package com.example.service.impl;

import com.example.model.Book;
import com.example.repository.BookRepository;
import com.example.service.IBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookServiceImpl implements IBookService {

    @Autowired
    BookRepository bookRepository;

    @Override
    public Page<Book> findAllBook(Pageable pageable, String book) {
          return bookRepository.findAllBook(pageable, "%" + book + "%");
    }

    @Override
    public void delete(int id) {
        bookRepository.deleteById(id);
    }

    @Override
    public void save(Book book) {
        bookRepository.save(book);
    }

    @Override
    public Optional<Book> findById(int id) {
        return bookRepository.findById(id);
    }
}
