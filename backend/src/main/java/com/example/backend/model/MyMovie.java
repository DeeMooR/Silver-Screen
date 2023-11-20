package com.example.backend.model;

import com.example.backend.entity.MyMovieEntity;
import com.example.backend.entity.SeatTypeEntity;

import java.util.List;

public class MyMovie {
    private int id_movie;
    private String date;
    private int i_row;
    private int i_column;
    private int cost;
    private int id_seance;
    private String type;

    public MyMovie() {
    }

    public static MyMovie toModel(MyMovieEntity entity) {
        MyMovie model = new MyMovie();
        model.setId_movie(entity.getId_movie());
        model.setDate(entity.getDate());
        model.setI_row(entity.getI_row());
        model.setI_column(entity.getI_column());
        model.setCost(entity.getCost());
        model.setId_seance(entity.getId_seance());
        model.setType(entity.getType().getType());
        return model;
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
    public void setType(String type) {
        this.type = type;
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
    public String getType() {
        return type;
    }
}
