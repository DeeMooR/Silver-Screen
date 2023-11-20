package com.example.backend.entity;

import com.example.backend.model.User;

import javax.persistence.*;

@Entity
@Table(name = "my_card")
public class MyCardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int number_card;
    private String start;
    private String end;
    private boolean status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "gift_card_id")
    private GiftCardEntity gift_card;

    public MyCardEntity() {
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
    public void setUser(UserEntity user) {
        this.user = user;
    }
    public void setGift_card(GiftCardEntity gift_card) {
        this.gift_card = gift_card;
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
    public UserEntity getUser() {
        return user;
    }
    public GiftCardEntity getGift_card() {
        return gift_card;
    }
}