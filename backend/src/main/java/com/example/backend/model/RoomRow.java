package com.example.backend.model;

import com.example.backend.entity.MyMovieEntity;
import com.example.backend.entity.RoomEntity;
import com.example.backend.entity.RoomRowEntity;
import com.example.backend.entity.SeatTypeEntity;

public class RoomRow {
    private int id;
    private int seats;
    private int room;
    private String type;

    public RoomRow() {
    }

    public static RoomRow toModel(RoomRowEntity entity) {
        RoomRow model = new RoomRow();
        model.setId(entity.getId());
        model.setSeats(entity.getSeats());
        model.setRoom(entity.getRoom().getId());
        model.setType(entity.getType().getType());
        return model;
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setSeats(int seats) {
        this.seats = seats;
    }
    public void setRoom(int room) {
        this.room = room;
    }
    public void setType(String type) {
        this.type = type;
    }

    public int getId() {
        return id;
    }
    public int getSeats() {
        return seats;
    }
    public int getRoom() {
        return room;
    }
    public String getType() {
        return type;
    }
}
