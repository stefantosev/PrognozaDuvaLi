package com.example.prognozaduvali;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class PrognozaDuvaLiApplication {

    public static void main(String[] args) {
        SpringApplication.run(PrognozaDuvaLiApplication.class, args);
    }

}
