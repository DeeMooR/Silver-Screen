package com.example.backend.modelShort;

import com.example.backend.entity.MyCardEntity;

public class MyCardShort {
    private int number_card;
    private String start;
    private String end;
    private boolean status;
    private int card_id;

    public MyCardShort() {
    }

    public static MyCardShort toModel(MyCardEntity entity) {
        MyCardShort model = new MyCardShort();
        model.setNumber_card(entity.getNumber_card());
        model.setStart(entity.getStart());
        model.setEnd(entity.getEnd());
        model.setStatus(entity.isStatus());
        model.setCard_id(entity.getCard().getId());
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
    public void setCard_id(int card_id) {
        this.card_id = card_id;
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
    public int getCard_id() {
        return card_id;
    }
}
