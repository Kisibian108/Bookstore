package com.example.model;

import javax.persistence.*;

@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String idProduct;
    private String name;
    private int totalPages;
    private String size;
    private String yearPublic;
    private String author;
    private String publisher;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    public Book() {
    }

    public Book(int id, String idProduct, String name, int totalPages, String size, String yearPublic, String author, String publisher, Category category) {
        this.id = id;
        this.idProduct = idProduct;
        this.name = name;
        this.totalPages = totalPages;
        this.size = size;
        this.yearPublic = yearPublic;
        this.author = author;
        this.publisher = publisher;
        this.category = category;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getIdProduct() {
        return idProduct;
    }

    public void setIdProduct(String idProduct) {
        this.idProduct = idProduct;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getYearPublic() {
        return yearPublic;
    }

    public void setYearPublic(String yearPublic) {
        this.yearPublic = yearPublic;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
