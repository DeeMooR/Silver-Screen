package com.example.backend.model;

import com.example.backend.entity.MyMovieEntity;

public class MyMovie {
    private int id;
    private String date;
    private int i_row;
    private int i_column;
    private int cost;
    private String type_id;
    private int seance_id;
    private int movie_id;
    private int user_id;

    public MyMovie() {
    }

    public static MyMovie toModel(MyMovieEntity entity) {
        MyMovie model = new MyMovie();
        model.setId(entity.getId());
        model.setDate(entity.getDate());
        model.setI_row(entity.getI_row());
        model.setI_column(entity.getI_column());
        model.setCost(entity.getCost());
        model.setType_id(entity.getType().getType());
        model.setSeance_id(entity.getSeance().getId());
        model.setMovie_id(entity.getMovie().getId());
        model.setUser_id(entity.getUser().getId());
        return model;
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
    public void setCost(int cost) {
        this.cost = cost;
    }
    public void setType_id(String type_id) {
        this.type_id = type_id;
    }
    public void setSeance_id(int seance_id) {
        this.seance_id = seance_id;
    }
    public void setMovie_id(int movie_id) {
        this.movie_id = movie_id;
    }
    public void setUser_id(int user_id) {
        this.user_id = user_id;
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
    public int getCost() {
        return cost;
    }
    public String getType_id() {
        return type_id;
    }
    public int getSeance_id() {
        return seance_id;
    }
    public int getMovie_id() {
        return movie_id;
    }
    public int getUser_id() {
        return user_id;
    }
}
