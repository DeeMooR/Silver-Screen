package com.example.backend.model;

import com.example.backend.entity.GenreEntity;
import com.example.backend.entity.ScheduleEntity;

import java.util.List;
import java.util.stream.Collectors;

public class Schedule {
    private int id;
    private String date;
    private int movie_id;
    private List<Seance> seances;

    public Schedule() {
    }

    public static Schedule toModel(ScheduleEntity entity) {
        Schedule model = new Schedule();
        model.setId(entity.getId());
        model.setDate(entity.getDate());
        model.setMovie_id(entity.getMovie().getId());
        model.setSeances(entity.getSeances().stream().map(Seance::toModel).collect(Collectors.toList()));
        return model;
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public void setMovie_id(int movie_id) {
        this.movie_id = movie_id;
    }
    public void setSeances(List<Seance> seances) {
        this.seances = seances;
    }

    public int getId() {
        return id;
    }
    public String getDate() {
        return date;
    }
    public int getMovie_id() {
        return movie_id;
    }
    public List<Seance> getSeances() {
        return seances;
    }
}
