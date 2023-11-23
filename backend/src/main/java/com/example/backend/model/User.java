package com.example.backend.model;

import com.example.backend.entity.UserEntity;
import com.example.backend.modelShort.MyCardShort;
import com.example.backend.modelShort.MyMovieShort;
import com.example.backend.modelShort.MySeatSelectShort;

import java.util.List;
import java.util.stream.Collectors;

public class User {
    private int id;
    private String username;
    private List<MyCardShort> myCards;
    private List<MyMovieShort> myMovies;
    private List<MySeatSelectShort> mySeatSelect;

    public User() {
    }

    public static User toModel(UserEntity entity) {
        User model = new User();
        model.setId(entity.getId());
        model.setUsername(entity.getUsername());
        model.setMyCards(entity.getMyCards().stream().map(MyCardShort::toModel).collect(Collectors.toList()));
        model.setMySeatSelect(entity.getMySeatSelect().stream().map(MySeatSelectShort::toModel).collect(Collectors.toList()));
        model.setMyMovies(entity.getMyMovies().stream().map(MyMovieShort::toModel).collect(Collectors.toList()));
        return model;
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public void setMyCards(List<MyCardShort> myCards) {
        this.myCards = myCards;
    }
    public void setMyMovies(List<MyMovieShort> myMovies) {
        this.myMovies = myMovies;
    }
    public void setMySeatSelect(List<MySeatSelectShort> mySeatSelect) {
        this.mySeatSelect = mySeatSelect;
    }

    public int getId() {
        return id;
    }
    public String getUsername() {
        return username;
    }
    public List<MyCardShort> getMyCards() {
        return myCards;
    }
    public List<MyMovieShort> getMyMovies() {
        return myMovies;
    }
    public List<MySeatSelectShort> getMySeatSelect() {
        return mySeatSelect;
    }
}
