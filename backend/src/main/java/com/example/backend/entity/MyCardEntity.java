package com.example.backend.entity;

import com.example.backend.model.User;

import javax.persistence.*;

@Entity
@Table(name = "my_card")
public class MyCardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int id_card;
    private int number_card;
    private String start;
    private String end;
    private boolean status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    public MyCardEntity() {
    }

    public void setId(int id) {
        this.id = id;
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
    public void setUser(UserEntity user) {
        this.user = user;
    }

    public int getId() {
        return id;
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
    public UserEntity getUser() {
        return user;
    }
}