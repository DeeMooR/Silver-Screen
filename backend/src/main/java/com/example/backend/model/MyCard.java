package com.example.backend.model;

import com.example.backend.entity.MyCardEntity;

public class MyCard {
    private int id;
    private int number_card;
    private String start;
    private String end;
    private boolean status;
    private int user_id;
    private int card_id;

    public MyCard() {
    }

    public static MyCard toModel(MyCardEntity entity) {
        MyCard model = new MyCard();
        model.setId(entity.getId());
        model.setNumber_card(entity.getNumber_card());
        model.setStart(entity.getStart());
        model.setEnd(entity.getEnd());
        model.setStatus(entity.isStatus());
        model.setUser_id(entity.getUser().getId());
        model.setCard_id(entity.getCard().getId());
        return model;
    }

    public void setId(int id) {
        this.id = id;
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
    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }
    public void setCard_id(int card_id) {
        this.card_id = card_id;
    }

    public int getId() {
        return id;
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
    public int getUser_id() {
        return user_id;
    }
    public int getCard_id() {
        return card_id;
    }
}
