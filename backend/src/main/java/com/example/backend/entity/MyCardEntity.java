package com.example.backend.entity;

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
    @JoinColumn(name = "card_id")
    private CardEntity card;

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
    public void setCard(CardEntity card) {
        this.card = card;
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
    public CardEntity getCard() {
        return card;
    }
}