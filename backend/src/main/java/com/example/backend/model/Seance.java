package com.example.backend.model;

import com.example.backend.entity.ScheduleEntity;
import com.example.backend.entity.SeanceEntity;

public class Seance {
    private int id;
    private String time;
    private int room_id;
    private int schedule_id;

    public Seance() {
    }

    public static Seance toModel(SeanceEntity entity) {
        Seance model = new Seance();
        model.setId(entity.getId());
        model.setTime(entity.getTime());
        model.setRoom_id(entity.getRoom().getId());
        model.setSchedule_id(entity.getSchedule().getId());
        return model;
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setTime(String time) {
        this.time = time;
    }
    public void setRoom_id(int room_id) {
        this.room_id = room_id;
    }
    public void setSchedule_id(int schedule_id) {
        this.schedule_id = schedule_id;
    }

    public int getId() {
        return id;
    }
    public String getTime() {
        return time;
    }
    public int getRoom_id() {
        return room_id;
    }
    public int getSchedule_id() {
        return schedule_id;
    }
}
