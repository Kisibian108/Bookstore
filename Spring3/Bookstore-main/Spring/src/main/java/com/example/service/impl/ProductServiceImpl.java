package com.example.service.impl;

import com.example.model.Products;
import com.example.repository.ProductRepository;
import com.example.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductServiceImpl implements IProductService {

    @Autowired
    ProductRepository productRepository;

    @Override
    public Page<Products> findAllProducts(Pageable pageable, String product) {
        return productRepository.findAllProduct(pageable, "%" + product + "%");
    }

    @Override
    public Optional<Products> findById(int id) {
        return productRepository.findById(id);
    }
}
