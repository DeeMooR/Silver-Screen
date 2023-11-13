package com.example.backend.model;

import com.example.backend.entity.MyCardEntity;

public class MyCard {
    private int id_card;
    private int number_card;
    private String start;
    private String end;
    private boolean status;

    public MyCard() {
    }

    public static MyCard toModel(MyCardEntity entity) {
        MyCard model = new MyCard();
        model.setIdCard(entity.getIdCard());
        model.setNumberCard(entity.getNumberCard());
        model.setStart(entity.getStart());
        model.setEnd(entity.getEnd());
        model.setStatus(entity.isStatus());
        return model;
    }

    public void setIdCard(int id_card) {
        this.id_card = id_card;
    }
    public void setNumberCard(int number_card) {
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

    public int getIdCard() {
        return id_card;
    }
    public int getNumberCard() {
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
}
