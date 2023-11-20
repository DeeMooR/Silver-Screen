package com.example.backend.model;

import com.example.backend.entity.MyMovieEntity;
import com.example.backend.entity.RoomEntity;
import com.example.backend.entity.RoomRowEntity;
import com.example.backend.entity.SeatTypeEntity;

public class RoomRow {
    private int id;
    private int seats;
    private int room_id;
    private String type_id;

    public RoomRow() {
    }

    public static RoomRow toModel(RoomRowEntity entity) {
        RoomRow model = new RoomRow();
        model.setId(entity.getId());
        model.setSeats(entity.getSeats());
        model.setRoom_id(entity.getRoom().getId());
        model.setType_id(entity.getType().getType());
        return model;
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setSeats(int seats) {
        this.seats = seats;
    }
    public void setRoom_id(int room_id) {
        this.room_id = room_id;
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
    public int getRoom_id() {
        return room_id;
    }
    public String getType_id() {
        return type_id;
    }
}
