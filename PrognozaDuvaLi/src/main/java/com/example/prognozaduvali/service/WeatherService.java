package com.example.prognozaduvali.service;


import com.example.prognozaduvali.DTO.WeatherResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Service
public class WeatherService {

    @Value("${weatherapi.key}")
    private String api;
    private final WebClient webClient;

    public WeatherService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl("http://api.weatherapi.com/v1")
                .build();
    }

    // Existing method for current weather only
    @Cacheable(value = "currentWeather", key = "#name")
    public WeatherResponse getWeatherData(String name) {
        try {
            return webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/current.json")
                            .queryParam("key", api)
                            .queryParam("q", name)
                            .build())
                    .retrieve()
                    .bodyToMono(WeatherResponse.class)
                    .block();
        } catch (WebClientResponseException e) {
            System.err.println("Error Response Body: " + e.getResponseBodyAsString());
            throw e;
        }
    }

    // NEW METHOD: For forecast with multiple days
    @Cacheable(value = "weatherForecast", key = "#name + '_' + #days")
    public WeatherResponse getWeatherDataWithDays(String name, int days) {
        try {
            return webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/forecast.json")
                            .queryParam("key", api)
                            .queryParam("q", name)
                            .queryParam("days", days)
                            .queryParam("aqi", "no")
                            .queryParam("alerts", "no")
                            .build())
                    .retrieve()
                    .bodyToMono(WeatherResponse.class)
                    .block();
        } catch (WebClientResponseException e) {
            System.err.println("Error Response Body: " + e.getResponseBodyAsString());
            throw e;
        }
    }
}