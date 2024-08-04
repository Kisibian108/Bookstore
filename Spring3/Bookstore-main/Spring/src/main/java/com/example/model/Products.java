package com.example.model;

import org.springframework.lang.Nullable;

import javax.persistence.*;

@Entity
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Nullable
    private String idProduct;
    private String name;
    private String img;
    private double price;
    private double discount;
    private double rate;
    private int star;
    @Column(columnDefinition = "TEXT")
    private String content;

    public Products() {
    }

    public Products(int id, String idProduct, String name, String img, double price, double discount, double rate, int star, String content) {
        this.id = id;
        this.idProduct = idProduct;
        this.name = name;
        this.img = img;
        this.price = price;
        this.discount = discount;
        this.rate = rate;
        this.star = star;
        this.content = content;
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

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
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
}
