package com.example.backend.model;

import com.example.backend.entity.MyCardEntity;

public class MyCard {
    private int number_card;
    private String start;
    private String end;
    private boolean status;
    private int user;
    private int gift_card;

    public MyCard() {
    }

    public static MyCard toModel(MyCardEntity entity) {
        MyCard model = new MyCard();
        model.setNumber_card(entity.getNumber_card());
        model.setStart(entity.getStart());
        model.setEnd(entity.getEnd());
        model.setStatus(entity.isStatus());
        model.setUser(entity.getUser().getId());
        model.setGift_card(entity.getGift_card().getId());
        return model;
    }

    public void setNumber_card(int number_card) {
        this.number_card = number_card;
    }
    public void setStart(String start) {
        this.start = start;
    }
    public void setEnd(String end) {
        this.end = end;
    }
    public void setStatus(boolean status) {
        this.status = status;
    }
    public void setUser(int user) {
        this.user = user;
    }
    public void setGift_card(int gift_card) {
        this.gift_card = gift_card;
    }

    public int getNumber_card() {
        return number_card;
    }
    public String getStart() {
        return start;
    }
    public String getEnd() {
        return end;
    }
    public boolean isStatus() {
        return status;
    }
    public int getUser() {
        return user;
    }
    public int getGift_card() {
        return gift_card;
    }
}
