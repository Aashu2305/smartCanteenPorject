package com.example.smart_canteen_backend.service;

import com.example.smart_canteen_backend.model.Order;
import com.example.smart_canteen_backend.model.User;
import com.example.smart_canteen_backend.repository.OrderRepository;
import com.example.smart_canteen_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    public Order placeOrder(Order order, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        order.setUser(user); // Link the order to the user
        order.setOrderTimestamp(LocalDateTime.now());
        return orderRepository.save(order);
    }

    // New method to get orders for a specific user
    public List<Order> getOrdersForUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUser(user);
    }
}