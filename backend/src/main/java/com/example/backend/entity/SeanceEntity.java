package com.example.backend.entity;

import javax.persistence.*;

@Entity
@Table(name = "seance")
public class SeanceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String time;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private RoomEntity room;

    @ManyToOne
    @JoinColumn(name = "schedule_id")
    private ScheduleEntity schedule;

    public SeanceEntity() {
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setTime(String time) {
        this.time = time;
    }
    public void setRoom(RoomEntity room) {
        this.room = room;
    }
    public void setSchedule(ScheduleEntity schedule) {
        this.schedule = schedule;
    }

    public int getId() {
        return id;
    }
    public String getTime() {
        return time;
    }
    public RoomEntity getRoom() {
        return room;
    }
    public ScheduleEntity getSchedule() {
        return schedule;
    }
}