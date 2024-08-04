package com.example.controller;

import com.example.model.Products;
import com.example.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductRestController {

    @Autowired
    IProductService productService;

    @GetMapping("/list")
    public ResponseEntity<Page<Products>> list(@PageableDefault(8) Pageable pageable,
                                               @RequestParam Optional<String> nameSearch){

        String name = nameSearch.orElse("");
        if(name.equals("null")){
            name = "";
        }
        Page<Products> products = productService.findAllProducts(pageable, name);
        if(products.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}
