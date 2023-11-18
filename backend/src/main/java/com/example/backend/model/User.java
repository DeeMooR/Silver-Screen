package com.example.backend.model;

import com.example.backend.entity.UserEntity;

import java.util.List;
import java.util.stream.Collectors;

public class User {
    private int id;
    private String username;
    private List<MyCard> myCards;
    private List<MyMovie> myMovies;
    private List<MySeatSelect> mySeatSelect;

    public User() {
    }

    public static User toModel(UserEntity entity) {
        User model = new User();
        model.setId(entity.getId());
        model.setUsername(entity.getUsername());
        model.setMyCards(entity.getMyCards().stream().map(MyCard::toModel).collect(Collectors.toList()));
        model.setMySeatSelect(entity.getMySeatSelect().stream().map(MySeatSelect::toModel).collect(Collectors.toList()));
        model.setMyMovies(entity.getMyMovies().stream().map(MyMovie::toModel).collect(Collectors.toList()));
        return model;
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public void setMyCards(List<MyCard> myCards) {
        this.myCards = myCards;
    }
    public void setMyMovies(List<MyMovie> myMovies) {
        this.myMovies = myMovies;
    }
    public void setMySeatSelect(List<MySeatSelect> mySeatSelect) {
        this.mySeatSelect = mySeatSelect;
    }

    public int getId() {
        return id;
    }
    public String getUsername() {
        return username;
    }
    public List<MyCard> getMyCards() {
        return myCards;
    }
    public List<MyMovie> getMyMovies() {
        return myMovies;
    }
    public List<MySeatSelect> getMySeatSelect() {
        return mySeatSelect;
    }
}
