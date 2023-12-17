package com.example.backend.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "my_movie")
public class MyMovieEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String date;
    private int i_row;
    private int i_column;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private SeatTypeEntity type;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private MovieEntity movie;

    @ManyToOne
    @JoinColumn(name = "seance_id")
    private SeanceEntity seance;

    public MyMovieEntity() {
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public void setI_row(int i_row) {
        this.i_row = i_row;
    }
    public void setI_column(int i_column) {
        this.i_column = i_column;
    }
    public void setType(SeatTypeEntity type) {
        this.type = type;
    }
    public void setUser(UserEntity user) {
        this.user = user;
    }
    public void setMovie(MovieEntity movie) {
        this.movie = movie;
    }
    public void setSeance(SeanceEntity seance) {
        this.seance = seance;
    }

    public int getId() {
        return id;
    }
    public String getDate() {
        return date;
    }
    public int getI_row() {
        return i_row;
    }
    public int getI_column() {
        return i_column;
    }
    public SeatTypeEntity getType() {
        return type;
    }
    public UserEntity getUser() {
        return user;
    }
    public MovieEntity getMovie() {
        return movie;
    }
    public SeanceEntity getSeance() {
        return seance;
    }
}