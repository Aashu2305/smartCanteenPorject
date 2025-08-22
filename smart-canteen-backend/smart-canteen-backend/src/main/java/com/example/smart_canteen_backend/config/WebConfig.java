//package com.example.smart_canteen_backend.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//
//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        // This is the crucial part. It tells Spring to serve files
//        // from the "classpath:/static/" folder (which is src/main/resources/static)
//        // when a request comes in for "/".
//        registry.addResourceHandler("/**")
//                .addResourceLocations("classpath:/static/");
//    }
//}