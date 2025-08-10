package com.example.smart_canteen_backend.repository;

import com.example.smart_canteen_backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // That's it! No more code is needed here.
}