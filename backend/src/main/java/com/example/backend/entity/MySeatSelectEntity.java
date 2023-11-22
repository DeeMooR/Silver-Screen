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

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "seance_id")
    private SeanceEntity seance;

    public MySeatSelectEntity() {
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setI_row(int i_row) {
        this.i_row = i_row;
    }
    public void setI_column(int i_column) {
        this.i_column = i_column;
    }
    public void setUser(UserEntity user) {
        this.user = user;
    }
    public void setSeance(SeanceEntity seance) {
        this.seance = seance;
    }

    public int getId() {
        return id;
    }
    public int getI_row() {
        return i_row;
    }
    public int getI_column() {
        return i_column;
    }
    public UserEntity getUser() {
        return user;
    }
    public SeanceEntity getSeance() {
        return seance;
    }
}