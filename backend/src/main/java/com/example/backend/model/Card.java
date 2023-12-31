package com.example.backend.model;

import com.example.backend.entity.CardEntity;

public class Card {
    private int id;
    private String image;
    private int cost;
    private int amount;

    public Card() {
    }

    public static Card toModel(CardEntity entity) {
        Card model = new Card();
        model.setId(entity.getId());
        model.setImage(entity.getImage());
        model.setCost(entity.getCost());
        model.setAmount(entity.getAmount());
        return model;
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public void setCost(int cost) {
        this.cost = cost;
    }
    public void setAmount(int amount) {
        this.amount = amount;
    }

    public int getId() {
        return id;
    }
    public String getImage() {
        return image;
    }
    public int getCost() {
        return cost;
    }
    public int getAmount() {
        return amount;
    }
}
