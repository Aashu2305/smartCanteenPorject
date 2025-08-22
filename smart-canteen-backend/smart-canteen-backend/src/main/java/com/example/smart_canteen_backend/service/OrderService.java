package com.example.smart_canteen_backend.service;

import com.example.smart_canteen_backend.dto.CartItemDto;
import com.example.smart_canteen_backend.model.Order;
import com.example.smart_canteen_backend.model.Product;
import com.example.smart_canteen_backend.model.User;
import com.example.smart_canteen_backend.repository.OrderRepository;
import com.example.smart_canteen_backend.repository.ProductRepository;
import com.example.smart_canteen_backend.repository.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public void checkStockAvailability(List<CartItemDto> cartItems) throws Exception {
        for (CartItemDto item : cartItems) {
            Product product = productRepository.findById(item.getId())
                    .orElseThrow(() -> new Exception("Product with id " + item.getId() + " not found"));

            if (item.getSize() != null && !item.getSize().isEmpty()) {
                switch (item.getSize()) {
                    case "Small":
                        if (product.getStockSmall() < item.getQuantity()) throw new Exception("Not enough Small stock for " + product.getName());
                        break;
                    case "Medium":
                        if (product.getStockMedium() < item.getQuantity()) throw new Exception("Not enough Medium stock for " + product.getName());
                        break;
                    case "Large":
                        if (product.getStockLarge() < item.getQuantity()) throw new Exception("Not enough Large stock for " + product.getName());
                        break;
                }
            } else {
                if (product.getStockQuantity() < item.getQuantity()) throw new Exception("Not enough stock for " + product.getName());
            }
        }
    }

    @Transactional
    public Order placeOrder(Order order, String username) throws Exception {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        order.setUser(user);
        order.setOrderTimestamp(LocalDateTime.now());

        ObjectMapper mapper = new ObjectMapper();
        List<Map<String, Object>> items = mapper.readValue(order.getOrderItems(), new TypeReference<>() {});

        for (Map<String, Object> item : items) {
            Long productId = ((Number) item.get("id")).longValue();
            int quantityOrdered = (int) item.get("quantity");
            String size = (String) item.get("size");

            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new Exception("Product " + productId + " not found"));

            if (size != null && !size.isEmpty()) {
                switch (size) {
                    case "Small":
                        product.setStockSmall(product.getStockSmall() - quantityOrdered);
                        break;
                    case "Medium":
                        product.setStockMedium(product.getStockMedium() - quantityOrdered);
                        break;
                    case "Large":
                        product.setStockLarge(product.getStockLarge() - quantityOrdered);
                        break;
                }
            } else {
                product.setStockQuantity(product.getStockQuantity() - quantityOrdered);
            }
            productRepository.save(product);
        }
        return orderRepository.save(order);
    }

    public List<Order> getOrdersForUser(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUserOrderByOrderTimestampDesc(user);
    }
}