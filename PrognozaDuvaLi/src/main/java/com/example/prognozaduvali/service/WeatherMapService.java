package com.example.prognozaduvali.service;

import com.example.prognozaduvali.DTO.CityWeather;
import com.example.prognozaduvali.DTO.WeatherResponse;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class WeatherMapService {

    private final WeatherService weatherService;
    
    private final List<String> majorCities = Arrays.asList(
        "Veles", "Skopje", "Kumanovo", "Bitola", "Stip",
        "Gevgelija", "Ohrid", "Tetovo", "Kocani",
        "Bogomila", "Gostivar", "Prilep", "Strumica", "Kicevo", "Kriva Palanka", "Demir"
    );

    public WeatherMapService(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @Async
    public CompletableFuture<CityWeather> getWeatherForCity(String cityName) {
        try {
            WeatherResponse response = weatherService.getWeatherData(cityName);
            
            if (response != null && response.getLocation() != null && response.getCurrent() != null) {
                CityWeather cityWeather = new CityWeather(
                    response.getLocation().getName(),
                    response.getLocation().getLat(),
                    response.getLocation().getLon(),
                    response.getCurrent().getTemp_c(),
                    response.getCurrent().getCondition().getText(),
                    response.getCurrent().getCondition().getIcon()
                );
                return CompletableFuture.completedFuture(cityWeather);
            }
        } catch (Exception e) {
            System.err.println("Error fetching weather for " + cityName + ": " + e.getMessage());
        }
        return CompletableFuture.completedFuture(null);
    }

    public List<CityWeather> getCountryWeatherData() {
        List<CompletableFuture<CityWeather>> futures = majorCities.stream()
            .map(this::getWeatherForCity)
            .collect(Collectors.toList());

        return futures.stream()
            .map(CompletableFuture::join)
            .filter(cityWeather -> cityWeather != null)
            .collect(Collectors.toList());
    }
    
    public List<CityWeather> getCountryWeatherData(String country) {
        return getCountryWeatherData();
    }
}