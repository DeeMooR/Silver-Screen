package com.example.backend.entity;

import javax.persistence.*;
import java.util.List;

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

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "seance")
    private List<MyMovieEntity> myMovie;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "seance")
    private List<MySeatSelectEntity> mySeatSelect;

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
    public void setMyMovie(List<MyMovieEntity> myMovie) {
        this.myMovie = myMovie;
    }
    public void setMySeatSelect(List<MySeatSelectEntity> mySeatSelect) {
        this.mySeatSelect = mySeatSelect;
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
    public List<MyMovieEntity> getMyMovie() {
        return myMovie;
    }
    public List<MySeatSelectEntity> getMySeatSelect() {
        return mySeatSelect;
    }
}