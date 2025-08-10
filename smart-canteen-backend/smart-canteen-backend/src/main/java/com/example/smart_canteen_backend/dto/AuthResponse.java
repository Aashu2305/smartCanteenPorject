package com.example.smart_canteen_backend.dto;

public class AuthResponse {
    private String jwt;

    public AuthResponse(String jwt) {
        this.jwt = jwt;
    }

    // Getter and Setter
    public String getJwt() { return jwt; }
    public void setJwt(String jwt) { this.jwt = jwt; }
}