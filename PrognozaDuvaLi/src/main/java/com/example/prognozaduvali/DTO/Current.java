package com.example.prognozaduvali.DTO;


import lombok.Data;

@Data
public class Current {
    private double temp_c;
    private int is_day;
    private String last_updated;
    private double humidity;
    private double feelslike_c;
    private double wind_kph;
    private double pressure;
    private Condition condition;

    public Current(double temp_c, int is_day, String last_updated, double humidity, double feelslike_c, double wind_kph, double pressure, Condition condition) {
        this.temp_c = temp_c;
        this.is_day = is_day;
        this.last_updated = last_updated;
        this.humidity = humidity;
        this.feelslike_c = feelslike_c;
        this.wind_kph = wind_kph;
        this.pressure = pressure;
        this.condition = condition;
    }

    public double getTemp_c() {
        return temp_c;
    }

    public void setTemp_c(double temp_c) {
        this.temp_c = temp_c;
    }

    public int getIs_day() {
        return is_day;
    }

    public void setIs_day(int is_day) {
        this.is_day = is_day;
    }

    public String getLast_updated() {
        return last_updated;
    }

    public void setLast_updated(String last_updated) {
        this.last_updated = last_updated;
    }

    public double getHumidity() {
        return humidity;
    }

    public void setHumidity(double humidity) {
        this.humidity = humidity;
    }

    public double getFeelslike_c() {
        return feelslike_c;
    }

    public void setFeelslike_c(double feelslike_c) {
        this.feelslike_c = feelslike_c;
    }

    public double getWind_kph() {
        return wind_kph;
    }

    public void setWind_kph(double wind_kph) {
        this.wind_kph = wind_kph;
    }

    public double getPressure() {
        return pressure;
    }

    public void setPressure(double pressure) {
        this.pressure = pressure;
    }

    public Condition getCondition() {
        return condition;
    }

    public void setCondition(Condition condition) {
        this.condition = condition;
    }
}

