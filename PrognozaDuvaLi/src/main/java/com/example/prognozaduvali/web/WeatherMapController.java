package com.example.prognozaduvali.web;

import com.example.prognozaduvali.DTO.CityWeather;
import com.example.prognozaduvali.service.WeatherMapService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/weather-map")
@CrossOrigin(origins = "https://prognoza-duva-li-jpd4.vercel.app/")
public class WeatherMapController {

    private final WeatherMapService weatherMapService;

    public WeatherMapController(WeatherMapService weatherMapService) {
        this.weatherMapService = weatherMapService;
    }

    @GetMapping("/country")
    public ResponseEntity<List<CityWeather>> getCountryWeather() {
        try {
            List<CityWeather> weatherData = weatherMapService.getCountryWeatherData();
            return ResponseEntity.ok(weatherData);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/country/{countryName}")
    public ResponseEntity<List<CityWeather>> getCountryWeather(
            @PathVariable String countryName) {
        try {
            List<CityWeather> weatherData = weatherMapService.getCountryWeatherData(countryName);
            return ResponseEntity.ok(weatherData);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}