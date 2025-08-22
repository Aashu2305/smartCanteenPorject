package com.example.smart_canteen_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;

    // 👇 Initializing these fields to 0.0 or 0 prevents them from ever being null
    private Double priceSmall = 0.0;
    private Double priceMedium = 0.0;
    private Double priceLarge = 0.0;

    private Integer stockSmall = 0;
    private Integer stockMedium = 0;
    private Integer stockLarge = 0;

    private double price;
    private int stockQuantity = 0; // Also initialize this one for safety
    private String description;
    private String tags;
    private String emoji;
    private String imageUrl;

    // --- Getters and Setters ---
    // (No changes needed to the getter/setter methods)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public Double getPriceSmall() { return priceSmall; }
    public void setPriceSmall(Double priceSmall) { this.priceSmall = priceSmall; }
    public Double getPriceMedium() { return priceMedium; }
    public void setPriceMedium(Double priceMedium) { this.priceMedium = priceMedium; }
    public Double getPriceLarge() { return priceLarge; }
    public void setPriceLarge(Double priceLarge) { this.priceLarge = priceLarge; }
    public Integer getStockSmall() { return stockSmall; }
    public void setStockSmall(Integer stockSmall) { this.stockSmall = stockSmall; }
    public Integer getStockMedium() { return stockMedium; }
    public void setStockMedium(Integer stockMedium) { this.stockMedium = stockMedium; }
    public Integer getStockLarge() { return stockLarge; }
    public void setStockLarge(Integer stockLarge) { this.stockLarge = stockLarge; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public int getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(int stockQuantity) { this.stockQuantity = stockQuantity; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }
    public String getEmoji() { return emoji; }
    public void setEmoji(String emoji) { this.emoji = emoji; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}