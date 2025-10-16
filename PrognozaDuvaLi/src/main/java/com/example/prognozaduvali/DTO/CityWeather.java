package com.example.prognozaduvali.DTO;


public class CityWeather {
    private String city;
    private double lat;
    private double lon;
    private double temperature;
    private String condition;
    private String icon;
    
    public CityWeather() {}
    
    public CityWeather(String city, double lat, double lon, double temperature, String condition, String icon) {
        this.city = city;
        this.lat = lat;
        this.lon = lon;
        this.temperature = temperature;
        this.condition = condition;
        this.icon = icon;
    }
    
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    
    public double getLat() { return lat; }
    public void setLat(double lat) { this.lat = lat; }
    
    public double getLon() { return lon; }
    public void setLon(double lon) { this.lon = lon; }
    
    public double getTemperature() { return temperature; }
    public void setTemperature(double temperature) { this.temperature = temperature; }
    
    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }
    
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
}