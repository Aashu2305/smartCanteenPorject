package com.example.smart_canteen_backend.service;

import com.example.smart_canteen_backend.model.User;
import com.example.smart_canteen_backend.repository.UserRepository;
import com.example.smart_canteen_backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");
        return userRepository.save(user);
    }

    // 👇 This method now has debug messages
    public String loginUser(String username, String password) throws Exception {
        System.out.println("\n--- [DEBUG] Login attempt for username: " + username + " ---");

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> {
                    System.out.println("--- [DEBUG] RESULT: User NOT FOUND in database. ---");
                    return new Exception("User not found");
                });

        System.out.println("--- [DEBUG] User FOUND in database.");
        System.out.println("--- [DEBUG] Password from login form: " + password);
        System.out.println("--- [DEBUG] Hashed password from database: " + user.getPassword());

        boolean isPasswordMatch = passwordEncoder.matches(password, user.getPassword());
        System.out.println("--- [DEBUG] Password match result: " + isPasswordMatch + " ---");

        if (!isPasswordMatch) {
            throw new Exception("Invalid credentials");
        }

        return jwtUtil.generateToken(user.getUsername());
    }
}