package com.example.backend.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "schedule")
public class ScheduleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String date;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private MovieEntity movie;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "schedule")
    private List<SeanceEntity> seances;

    public ScheduleEntity() {
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public void setMovie(MovieEntity movie) {
        this.movie = movie;
    }
    public void setSeances(List<SeanceEntity> seances) {
        this.seances = seances;
    }

    public int getId() {
        return id;
    }
    public String getDate() {
        return date;
    }
    public MovieEntity getMovie() {
        return movie;
    }
    public List<SeanceEntity> getSeances() {
        return seances;
    }
}