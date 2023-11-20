package com.example.backend.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "my_movie")
public class MyMovieEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int id_movie;
    private String date;
    private int i_row;
    private int i_column;
    private int cost;
    private int id_seance;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private SeatTypeEntity type;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    public MyMovieEntity() {
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setId_movie(int id_movie) {
        this.id_movie = id_movie;
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
    public void setCost(int cost) {
        this.cost = cost;
    }
    public void setId_seance(int id_seance) {
        this.id_seance = id_seance;
    }
    public void setType(SeatTypeEntity type) {
        this.type = type;
    }
    public void setUser(UserEntity user) {
        this.user = user;
    }

    public int getId() {
        return id;
    }
    public int getId_movie() {
        return id_movie;
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
    public int getCost() {
        return cost;
    }
    public int getId_seance() {
        return id_seance;
    }
    public SeatTypeEntity getType() {
        return type;
    }
    public UserEntity getUser() {
        return user;
    }
}