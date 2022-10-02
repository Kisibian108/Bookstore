package com.example.repository;

import com.example.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookRepository extends JpaRepository<Book,Integer> {

    @Query(value = " select * from book where name like :name", nativeQuery = true,
            countQuery = " select count(*) from (select * from book where name like :name) temp_table ")
    Page<Book> findAllBook(Pageable pageable, @Param("name") String name);
}
