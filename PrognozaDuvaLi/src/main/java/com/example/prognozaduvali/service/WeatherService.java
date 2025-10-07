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
    private final WebClient webClient; //MAGIJA -> da se povrze


    //da ne ja pisue cela url vo konstruktorot se prakja
    public WeatherService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl("http://api.weatherapi.com/v1")
                .build();
    }

    //toa sho ke vrati metodata ke SE KESHIRA
    @Cacheable
    public WeatherResponse getWeatherData (String name) {
        try {
            return webClient.get()
                    .uri(uriBuilder -> uriBuilder    //MAGIJA ->
                            .path("/current.json")
                            .queryParam("key", api)
                            .queryParam("q", name)
                            .build())
                    .retrieve()
                    .bodyToMono(WeatherResponse.class) //NAJJAKATA MAGIJA GI ZIMA RABOTITE I GI MAPIRA (JACKSON GO PRAVI TOA)
                    .block();
        } catch (WebClientResponseException e) {
            System.err.println("Error Response Body: " + e.getResponseBodyAsString());
            throw e;
        }
    }
}


