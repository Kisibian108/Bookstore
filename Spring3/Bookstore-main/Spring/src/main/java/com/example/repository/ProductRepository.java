package com.example.repository;

import com.example.model.Products;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Products, Integer> {

    @Query(value = "select * from products where name like :name", nativeQuery = true,
    countQuery = "select count(*) from (select * from products where name like :name) temp_table")
    Page<Products> findAllProduct(Pageable pageable, @Param("name") String name);
}
