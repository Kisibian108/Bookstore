package com.example.controller;

import com.example.model.Book;
import com.example.service.IBookService;
import com.example.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/public")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BookRestController {

    @Autowired
    IBookService bookService;

    @Autowired
    ICategoryService categoryService;

    @GetMapping("/page")
    public ResponseEntity<Page<Book>> listAll(@PageableDefault(8) Pageable pageable,
                                              @RequestParam Optional<String> nameSearch) {
        String name = nameSearch.orElse("");
        if (name.equals("null")) {
            name = "";
        }
        Page<Book> book = bookService.findAllBook(pageable, name);
        if (book.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(book, HttpStatus.OK);
    }
}
