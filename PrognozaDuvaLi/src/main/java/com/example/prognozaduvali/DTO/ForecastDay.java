package com.example.prognozaduvali.DTO;

import lombok.Data;
import java.util.List;

@Data
public class ForecastDay {
    private String date;
    private Day day;
    private List<Hour> hour;

    public ForecastDay() {}

    public ForecastDay(String date, Day day, List<Hour> hour) {
        this.date = date;
        this.day = day;
        this.hour = hour;
    }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public Day getDay() { return day; }
    public void setDay(Day day) { this.day = day; }
    public List<Hour> getHour() { return hour; }
    public void setHour(List<Hour> hour) { this.hour = hour; }
}