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
    public void setIdMovie(int id_movie) {
        this.id_movie = id_movie;
    }
    public void setRow(int i_row) {
        this.i_row = i_row;
    }
    public void setColumn(int i_column) {
        this.i_column = i_column;
    }
    public void setCost(int cost) {
        this.cost = cost;
    }
    public void setIdSeance(int id_seance) {
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
    public int getIdMovie() {
        return id_movie;
    }
    public int getRow() {
        return i_row;
    }
    public int getColumn() {
        return i_column;
    }
    public int getCost() {
        return cost;
    }
    public int getIdSeance() {
        return id_seance;
    }
    public SeatTypeEntity getType() {
        return type;
    }
    public UserEntity getUser() {
        return user;
    }
}