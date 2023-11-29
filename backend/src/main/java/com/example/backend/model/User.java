package com.example.backend.model;

import com.example.backend.entity.UserEntity;
import com.example.backend.modelShort.MyCardShort;
import com.example.backend.modelShort.MyMovieShort;
import com.example.backend.modelShort.MySeatSelectShort;

import java.util.List;
import java.util.stream.Collectors;

public class User {
    private int id;
    private List<MyCardShort> my_card;
    private List<MyMovieShort> my_movie;
    private List<MySeatSelectShort> my_seat_select;

    public User() {
    }

    public static User toModel(UserEntity entity) {
        User model = new User();
        model.setId(entity.getId());
        model.setMy_card(entity.getMy_card().stream().map(MyCardShort::toModel).collect(Collectors.toList()));
        model.setMy_movie(entity.getMy_movie().stream().map(MyMovieShort::toModel).collect(Collectors.toList()));
        model.setMy_seat_select(entity.getMy_seat_select().stream().map(MySeatSelectShort::toModel).collect(Collectors.toList()));
        return model;
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setMy_card(List<MyCardShort> my_card) {
        this.my_card = my_card;
    }
    public void setMy_movie(List<MyMovieShort> my_movie) {
        this.my_movie = my_movie;
    }
    public void setMy_seat_select(List<MySeatSelectShort> my_seat_select) {
        this.my_seat_select = my_seat_select;
    }

    public int getId() {
        return id;
    }
    public List<MyCardShort> getMy_card() {
        return my_card;
    }
    public List<MyMovieShort> getMy_movie() {
        return my_movie;
    }
    public List<MySeatSelectShort> getMy_seat_select() {
        return my_seat_select;
    }
}
