package com.example.service;

import com.example.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface IBookService {

    Page<Book> findAllBook(Pageable pageable, String book);

    void delete(int id);

    void save(Book book);

    Optional<Book> findById(int id);
}
