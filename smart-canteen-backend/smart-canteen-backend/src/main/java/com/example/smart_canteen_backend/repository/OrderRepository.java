package com.example.smart_canteen_backend.repository;

import com.example.smart_canteen_backend.model.Order;
import com.example.smart_canteen_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // 👇 This method name now tells Spring to sort the results automatically 👇
    // findByUser...         -> Find all orders for this user
    // ...OrderBy...         -> and sort them by...
    // ...OrderTimestamp...  -> the 'orderTimestamp' field...
    // ...Desc               -> in descending (newest first) order.
    List<Order> findByUserOrderByOrderTimestampDesc(User user);
}