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
    private String img;
    private int quantity;
    private double price;
    private double discount;
    private double rate;
    private int star;
    @Column(columnDefinition = "TEXT")
    private String content;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    public Book() {
    }

    public Book(int id, String idProduct, String name, int totalPages, String size, String yearPublic, String author, String publisher, String img, int quantity, double price, double discount, double rate, int star, String content, Category category) {
        this.id = id;
        this.idProduct = idProduct;
        this.name = name;
        this.totalPages = totalPages;
        this.size = size;
        this.yearPublic = yearPublic;
        this.author = author;
        this.publisher = publisher;
        this.img = img;
        this.quantity = quantity;
        this.price = price;
        this.discount = discount;
        this.rate = rate;
        this.star = star;
        this.content = content;
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

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public double getRate() {
        return rate;
    }

    public void setRate(double rate) {
        this.rate = rate;
    }

    public int getStar() {
        return star;
    }

    public void setStar(int star) {
        this.star = star;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
