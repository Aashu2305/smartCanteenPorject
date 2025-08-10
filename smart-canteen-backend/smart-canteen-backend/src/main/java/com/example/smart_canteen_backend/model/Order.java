package com.example.smart_canteen_backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String orderItems;

    private double totalPrice;
    private LocalDateTime orderTimestamp;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference // 👇 This is the "back" side that breaks the loop
    private User user;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getOrderItems() { return orderItems; }
    public void setOrderItems(String orderItems) { this.orderItems = orderItems; }
    public double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }
    public LocalDateTime getOrderTimestamp() { return orderTimestamp; }
    public void setOrderTimestamp(LocalDateTime orderTimestamp) { this.orderTimestamp = orderTimestamp; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}