package com.example.backend.modelShort;

import com.example.backend.entity.RoomRowEntity;

public class RoomRowShort {
    private int id;
    private int seats;
    private String type_id;

    public RoomRowShort() {
    }

    public static RoomRowShort toModel(RoomRowEntity entity) {
        RoomRowShort model = new RoomRowShort();
        model.setId(entity.getId());
        model.setSeats(entity.getSeats());
        model.setType_id(entity.getType().getType());
        return model;
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setSeats(int seats) {
        this.seats = seats;
    }
    public void setType_id(String type_id) {
        this.type_id = type_id;
    }

    public int getId() {
        return id;
    }
    public int getSeats() {
        return seats;
    }
    public String getType_id() {
        return type_id;
    }
}
