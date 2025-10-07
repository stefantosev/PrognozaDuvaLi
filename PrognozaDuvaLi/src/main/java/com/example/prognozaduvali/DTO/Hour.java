package com.example.prognozaduvali.DTO;

import lombok.Data;

@Data
public class Hour {
    private String time;
    private double temp_c;
    private double temp_f;
    private int is_day;
    private Condition condition;
    private double wind_kph;
    private double humidity;
    private double feelslike_c;

    public Hour() {}

    public Hour(String time, double temp_c, double temp_f, int is_day, 
                Condition condition, double wind_kph, double humidity, double feelslike_c) {
        this.time = time;
        this.temp_c = temp_c;
        this.temp_f = temp_f;
        this.is_day = is_day;
        this.condition = condition;
        this.wind_kph = wind_kph;
        this.humidity = humidity;
        this.feelslike_c = feelslike_c;
    }

    
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public double getTemp_c() { return temp_c; }
    public void setTemp_c(double temp_c) { this.temp_c = temp_c; }
    public double getTemp_f() { return temp_f; }
    public void setTemp_f(double temp_f) { this.temp_f = temp_f; }
    public int getIs_day() { return is_day; }
    public void setIs_day(int is_day) { this.is_day = is_day; }
    public Condition getCondition() { return condition; }
    public void setCondition(Condition condition) { this.condition = condition; }
    public double getWind_kph() { return wind_kph; }
    public void setWind_kph(double wind_kph) { this.wind_kph = wind_kph; }
    public double getHumidity() { return humidity; }
    public void setHumidity(double humidity) { this.humidity = humidity; }
    public double getFeelslike_c() { return feelslike_c; }
    public void setFeelslike_c(double feelslike_c) { this.feelslike_c = feelslike_c; }
}