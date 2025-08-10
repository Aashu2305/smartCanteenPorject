package com.example.smart_canteen_backend.repository;

import com.example.smart_canteen_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // This is a custom query method.
    // By naming it this way, Spring Data JPA will automatically write the code
    // to find a user by their 'username' field in the database.
    Optional<User> findByUsername(String username);
}