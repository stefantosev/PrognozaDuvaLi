package com.example.prognozaduvali.web;
import com.example.prognozaduvali.DTO.WeatherResponse;
import com.example.prognozaduvali.service.WeatherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "https://prognoza-duva-li-jpd4.vercel.app/")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping(value = "/{city}", produces = "application/json")
    public ResponseEntity<WeatherResponse> getWeather(@PathVariable String city) {
        return ResponseEntity.ok(weatherService.getWeatherData(city));
    }

    @GetMapping(value = "/{city}/forecast", produces = "application/json")
    public ResponseEntity<WeatherResponse> getWeatherForecast(
            @PathVariable String city,
            @RequestParam(defaultValue = "3") int days) {
        
        if (days < 1 || days > 14) {
            throw new IllegalArgumentException("Days parameter must be between 1 and 14");
        }
        
        return ResponseEntity.ok(weatherService.getWeatherDataWithDays(city, days));
    }

    @GetMapping(value = "/{latitude},{longitude}", produces = "application/json")
    public ResponseEntity<WeatherResponse> getLatLong(@PathVariable double latitude, double longitude){
        return ResponseEntity.ok(weatherService.getWeatherWithLatitudeLongitude(latitude,longitude));
    }
}