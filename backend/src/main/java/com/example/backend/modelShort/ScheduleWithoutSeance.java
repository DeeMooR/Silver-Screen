package com.example.backend.modelShort;

import com.example.backend.entity.ScheduleEntity;

import java.util.ArrayList;
import java.util.List;

public class ScheduleWithoutSeance {
    private String date;
    private List<SeanceShort> seances;

    public ScheduleWithoutSeance() {
    }

    public static ScheduleWithoutSeance toModel(ScheduleEntity entity) {
        ScheduleWithoutSeance model = new ScheduleWithoutSeance();
        model.setDate(entity.getDate());
        model.setSeances(new ArrayList<>());
        return model;
    }

    public void setDate(String date) {
        this.date = date;
    }
    public void setSeances(List<SeanceShort> seances) {
        this.seances = seances;
    }

    public String getDate() {
        return date;
    }
    public List<SeanceShort> getSeances() {
        return seances;
    }
}
