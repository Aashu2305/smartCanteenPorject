package com.example.smart_canteen_backend.controller;
import com.example.smart_canteen_backend.dto.CartItemDto; // 👈 Make sure this import is present
import com.example.smart_canteen_backend.model.Order;
import com.example.smart_canteen_backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // 👇 THIS IS THE CORRECTED METHOD 👇
    // It now correctly accepts a List of CartItemDto
    @PostMapping("/check-stock")
    public ResponseEntity<?> checkStock(@RequestBody List<CartItemDto> cartItems) {
        try {
            orderService.checkStockAvailability(cartItems);
            return ResponseEntity.ok().build(); // Return 200 OK if stock is available
        } catch (Exception e) {
            // Return the specific error message (e.g., "Not enough stock for Pizza")
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order, @AuthenticationPrincipal UserDetails userDetails) {
        try {
            Order newOrder = orderService.placeOrder(order, userDetails.getUsername());
            return ResponseEntity.ok(newOrder);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/my-orders")
    public List<Order> getMyOrders(@AuthenticationPrincipal UserDetails userDetails) {
        return orderService.getOrdersForUser(userDetails.getUsername());
    }
}