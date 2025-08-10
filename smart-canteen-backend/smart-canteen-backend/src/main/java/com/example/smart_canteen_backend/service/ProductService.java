package com.example.smart_canteen_backend.service;

import com.example.smart_canteen_backend.model.Product;
import com.example.smart_canteen_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// @Service marks this class as a service component, the "brain" of the application.
@Service
public class ProductService {

    // This holds a reference to our repository (the pantry assistant).
    private final ProductRepository productRepository;

    // This is a constructor that uses @Autowired for dependency injection.
    // It's how we ask Spring to give us the ProductRepository we created.
    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // This is our first "business logic" method.
    // It uses the repository to fetch all products from the database.
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}