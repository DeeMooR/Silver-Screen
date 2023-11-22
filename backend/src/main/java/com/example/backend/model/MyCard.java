package com.example.backend.model;

import com.example.backend.entity.MyCardEntity;

public class MyCard {
    private int number_card;
    private String start;
    private String end;
    private boolean status;
    private int gift_card_id;

    public MyCard() {
    }

    public static MyCard toModel(MyCardEntity entity) {
        MyCard model = new MyCard();
        model.setNumber_card(entity.getNumber_card());
        model.setStart(entity.getStart());
        model.setEnd(entity.getEnd());
        model.setStatus(entity.isStatus());
        model.setGift_card_id(entity.getGift_card().getId());
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
    public void setGift_card_id(int gift_card_id) {
        this.gift_card_id = gift_card_id;
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
    public int getGift_card_id() {
        return gift_card_id;
    }
}
