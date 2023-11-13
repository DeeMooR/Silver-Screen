package com.example.backend.entity;

import javax.persistence.*;

@Entity
@Table(name = "my_seat_select")
public class MySeatSelectEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int i_row;
    private int i_column;
    private int id_seance;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    public MySeatSelectEntity() {
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setRow(int i_row) {
        this.i_row = i_row;
    }
    public void setColumn(int i_column) {
        this.i_column = i_column;
    }
    public void setIdSeance(int id_seance) {
        this.id_seance = id_seance;
    }
    public void setUser(UserEntity user) {
        this.user = user;
    }

    public int getId() {
        return id;
    }
    public int getRow() {
        return i_row;
    }
    public int getColumn() {
        return i_column;
    }
    public int getIdSeance() {
        return id_seance;
    }
    public UserEntity getUser() {
        return user;
    }
}