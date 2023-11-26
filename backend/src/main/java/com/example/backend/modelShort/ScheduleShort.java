package com.example.backend.modelShort;

import com.example.backend.entity.ScheduleEntity;
import com.example.backend.model.Seance;

import java.util.List;
import java.util.stream.Collectors;

public class ScheduleShort {
    private String date;
    private List<SeanceShort> seances;

    public ScheduleShort() {
    }

    public static ScheduleShort toModel(ScheduleEntity entity) {
        ScheduleShort model = new ScheduleShort();
        model.setDate(entity.getDate());
        model.setSeances(entity.getSeances().stream().map(SeanceShort::toModel).collect(Collectors.toList()));
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
