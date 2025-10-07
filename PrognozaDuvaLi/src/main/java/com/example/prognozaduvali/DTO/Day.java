package com.example.prognozaduvali.DTO;

import lombok.Data;

@Data
public class Day {
    private double maxtemp_c;
    private double maxtemp_f;
    private double mintemp_c;
    private double mintemp_f;
    private double avgtemp_c;
    private double avgtemp_f;
    private double maxwind_kph;
    private double totalprecip_mm;
    private double avghumidity;
    private Condition condition;
    private double uv;

    public Day() {}

    public Day(double maxtemp_c, double maxtemp_f, double mintemp_c, double mintemp_f, 
               double avgtemp_c, double avgtemp_f, double maxwind_kph, double totalprecip_mm,
               double avghumidity, Condition condition, double uv) {
        this.maxtemp_c = maxtemp_c;
        this.maxtemp_f = maxtemp_f;
        this.mintemp_c = mintemp_c;
        this.mintemp_f = mintemp_f;
        this.avgtemp_c = avgtemp_c;
        this.avgtemp_f = avgtemp_f;
        this.maxwind_kph = maxwind_kph;
        this.totalprecip_mm = totalprecip_mm;
        this.avghumidity = avghumidity;
        this.condition = condition;
        this.uv = uv;
    }

   
    public double getMaxtemp_c() { return maxtemp_c; }
    public void setMaxtemp_c(double maxtemp_c) { this.maxtemp_c = maxtemp_c; }
    public double getMaxtemp_f() { return maxtemp_f; }
    public void setMaxtemp_f(double maxtemp_f) { this.maxtemp_f = maxtemp_f; }
    public double getMintemp_c() { return mintemp_c; }
    public void setMintemp_c(double mintemp_c) { this.mintemp_c = mintemp_c; }
    public double getMintemp_f() { return mintemp_f; }
    public void setMintemp_f(double mintemp_f) { this.mintemp_f = mintemp_f; }
    public double getAvgtemp_c() { return avgtemp_c; }
    public void setAvgtemp_c(double avgtemp_c) { this.avgtemp_c = avgtemp_c; }
    public double getAvgtemp_f() { return avgtemp_f; }
    public void setAvgtemp_f(double avgtemp_f) { this.avgtemp_f = avgtemp_f; }
    public double getMaxwind_kph() { return maxwind_kph; }
    public void setMaxwind_kph(double maxwind_kph) { this.maxwind_kph = maxwind_kph; }
    public double getTotalprecip_mm() { return totalprecip_mm; }
    public void setTotalprecip_mm(double totalprecip_mm) { this.totalprecip_mm = totalprecip_mm; }
    public double getAvghumidity() { return avghumidity; }
    public void setAvghumidity(double avghumidity) { this.avghumidity = avghumidity; }
    public Condition getCondition() { return condition; }
    public void setCondition(Condition condition) { this.condition = condition; }
    public double getUv() { return uv; }
    public void setUv(double uv) { this.uv = uv; }
}