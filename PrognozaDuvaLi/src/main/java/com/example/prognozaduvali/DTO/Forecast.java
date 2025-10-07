package com.example.prognozaduvali.DTO;

import lombok.Data;
import java.util.List;

@Data
public class Forecast {
    private List<ForecastDay> forecastday;

    public Forecast() {}

    public Forecast(List<ForecastDay> forecastday) {
        this.forecastday = forecastday;
    }

    public List<ForecastDay> getForecastday() { return forecastday; }
    public void setForecastday(List<ForecastDay> forecastday) { this.forecastday = forecastday; }
}