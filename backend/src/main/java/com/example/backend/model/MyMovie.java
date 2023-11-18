package com.example.backend.model;

import com.example.backend.entity.MyMovieEntity;
import com.example.backend.entity.SeatTypeEntity;

import java.util.List;

public class MyMovie {
    private int id_movie;
    private int i_row;
    private int i_column;
    private int cost;
    private SeatTypeEntity type;
    private int id_seance;

    public MyMovie() {
    }

    public static MyMovie toModel(MyMovieEntity entity) {
        MyMovie model = new MyMovie();
        model.setIdMovie(entity.getIdMovie());
        model.setRow(entity.getRow());
        model.setColumn(entity.getColumn());
        model.setCost(entity.getCost());
        model.setType(entity.getType());
        model.setIdSeance(entity.getIdSeance());
        return model;
    }

    public void setIdMovie(int id_movie) {
        this.id_movie = id_movie;
    }
    public void setRow(int i_row) {
        this.i_row = i_row;
    }
    public void setColumn(int column) {
        this.i_column = i_column;
    }
    public void setCost(int cost) {
        this.cost = cost;
    }
    public void setType(SeatTypeEntity type) {
        this.type = type;
    }
    public void setIdSeance(int id_seance) {
        this.id_seance = id_seance;
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
    public SeatTypeEntity getType() {
        return type;
    }
    public int getIdSeance() {
        return id_seance;
    }
}
