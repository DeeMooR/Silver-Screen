package com.example.backend.entity;

import javax.persistence.*;

@Entity
@Table(name = "gift_card")
public class GiftCardEntity {
    @Id
    private int id;
    private String image;
    private int cost;
    private int amount;

    public GiftCardEntity() {
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