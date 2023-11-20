package com.example.backend.entity;

import javax.persistence.*;

@Entity
@Table(name = "room_row")
public class RoomRowEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int seats;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private SeatTypeEntity type;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private RoomEntity room;

    public RoomRowEntity() {
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setSeats(int seats) {
        this.seats = seats;
    }
    public void setType(SeatTypeEntity type) {
        this.type = type;
    }
    public void setRoom(RoomEntity room) {
        this.room = room;
    }

    public int getId() {
        return id;
    }
    public int getSeats() {
        return seats;
    }
    public SeatTypeEntity getType() {
        return type;
    }
    public RoomEntity getRoom() {
        return room;
    }
}