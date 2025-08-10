package com.example.smart_canteen_backend.controller;

import com.example.smart_canteen_backend.model.Order;
import com.example.smart_canteen_backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // Updated to get the logged-in user's details automatically
    @PostMapping
    public Order createOrder(@RequestBody Order order, @AuthenticationPrincipal UserDetails userDetails) {
        return orderService.placeOrder(order, userDetails.getUsername());
    }

    // New endpoint to get orders for the currently logged-in user
    @GetMapping("/my-orders")
    public List<Order> getMyOrders(@AuthenticationPrincipal UserDetails userDetails) {
        return orderService.getOrdersForUser(userDetails.getUsername());
    }
}