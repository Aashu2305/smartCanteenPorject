package com.example.smart_canteen_backend.controller;

import com.example.smart_canteen_backend.dto.AuthResponse;
import com.example.smart_canteen_backend.dto.LoginRequest;
import com.example.smart_canteen_backend.model.User;
import com.example.smart_canteen_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
// The @CrossOrigin import is now removed

@RestController
@RequestMapping("/api/auth")
// The @CrossOrigin annotation is now removed from here
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public User registerUser(@RequestBody User user) {
        return authService.registerUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            String token = authService.loginUser(loginRequest.getUsername(), loginRequest.getPassword());
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage()); // 401 Unauthorized
        }
    }
}