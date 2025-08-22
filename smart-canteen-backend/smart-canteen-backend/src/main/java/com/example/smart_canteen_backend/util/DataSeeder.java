package com.example.smart_canteen_backend.util;

import com.example.smart_canteen_backend.model.Product;
import com.example.smart_canteen_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;

    @Autowired
    public DataSeeder(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("--- [DataSeeder] Checking product stock levels... ---");

        List<Product> products = productRepository.findAll();
        boolean updated = false;

        for (Product product : products) {
            // We check if stockQuantity is 0 (the default for int)
            if (product.getStockQuantity() == 0) {
                product.setStockQuantity(20); // Set initial stock to 20
                productRepository.save(product);
                updated = true;
                System.out.println("--- [DataSeeder] Updated stock for: " + product.getName() + " ---");
            }
        }

        if (updated) {
            System.out.println("--- [DataSeeder] Finished updating product stock. ---");
        } else {
            System.out.println("--- [DataSeeder] All products already have stock. No action needed. ---");
        }
    }
}