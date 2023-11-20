package com.example.backend.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "gift_card")
public class GiftCardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String image;
    private int cost;
    private int amount;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "gift_card")
    private List<MyCardEntity> myCards;

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
    public void setMyCards(List<MyCardEntity> myCards) {
        this.myCards = myCards;
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
    public List<MyCardEntity> getMyCards() {
        return myCards;
    }
}