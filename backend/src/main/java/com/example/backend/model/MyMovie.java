package com.example.backend.model;

import com.example.backend.entity.MyMovieEntity;

public class MyMovie {
    private int id_movie;
    private int i_row;
    private int i_column;
    private int cost;
    private String type_seat;
    private int id_seance;

    public MyMovie() {
    }

    public static MyMovie toModel(MyMovieEntity entity) {
        MyMovie model = new MyMovie();
        model.setIdMovie(entity.getIdMovie());
        model.setRow(entity.getRow());
        model.setColumn(entity.getColumn());
        model.setCost(entity.getCost());
        model.setTypeSeat(entity.getTypeSeat());
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
    public void setTypeSeat(String type_seat) {
        this.type_seat = type_seat;
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
    public String getTypeSeat() {
        return type_seat;
    }
    public int getIdSeance() {
        return id_seance;
    }
}
