package com.example.prognozaduvali.DTO;

import lombok.Data;


@Data
public class WeatherResponse {
    private Location location;
    private Current current;

    public WeatherResponse(Location location, Current current) {
        this.location = location;
        this.current = current;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Current getCurrent() {
        return current;
    }

    public void setCurrent(Current current) {
        this.current = current;
    }
}
