package com.example.smart_canteen_backend.repository;

import com.example.smart_canteen_backend.model.Order;
import com.example.smart_canteen_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // New custom query to find all orders for a specific user
    List<Order> findByUser(User user);
}