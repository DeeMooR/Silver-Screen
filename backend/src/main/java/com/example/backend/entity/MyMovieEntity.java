package com.example.backend.entity;

import javax.persistence.*;

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
    private String type_seat;
    private int id_seance;

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
    public void setTypeSeat(String type_seat) {
        this.type_seat = type_seat;
    }
    public void setIdSeance(int id_seance) {
        this.id_seance = id_seance;
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
    public String getTypeSeat() {
        return type_seat;
    }
    public int getIdSeance() {
        return id_seance;
    }
    public UserEntity getUser() {
        return user;
    }
}