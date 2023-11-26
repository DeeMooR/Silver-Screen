package com.example.backend.modelShort;

import com.example.backend.entity.SeanceEntity;

import java.util.List;
import java.util.stream.Collectors;

public class SeanceShort {
    private String time;
    private int room_id;
    private List<int[]> places;

    public SeanceShort() {
    }

    public static SeanceShort toModel(SeanceEntity entity) {
        SeanceShort model = new SeanceShort();
        model.setTime(entity.getTime());
        model.setRoom_id(entity.getRoom().getId());
        model.setPlaces(entity.getPlaces().stream().map(placesEntity -> placesEntity.getNumbers()).collect(Collectors.toList()));
        return model;
    }

    public void setTime(String time) {
        this.time = time;
    }
    public void setRoom_id(int room_id) {
        this.room_id = room_id;
    }
    public void setPlaces(List<int[]> places) {
        this.places = places;
    }

    public String getTime() {
        return time;
    }
    public int getRoom_id() {
        return room_id;
    }
    public List<int[]> getPlaces() {
        return places;
    }
}
