package com.example.service;

import com.example.model.Products;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface IProductService {

    Page<Products> findAllProducts(Pageable pageable, String product);

    Optional<Products> findById(int id);
}
