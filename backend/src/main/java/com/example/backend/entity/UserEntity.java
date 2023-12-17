package com.example.backend.entity;

import com.example.backend.modelShort.MyCardShort;
import com.example.backend.modelShort.MyMovieShort;
import com.example.backend.modelShort.MySeatSelectShort;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "user")
public class UserEntity {
    @Id
    private int id;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<MyCardEntity> my_card;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<MyMovieEntity> my_movie;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<MySeatSelectEntity> my_seat_select;

    public UserEntity() {
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setMy_card(List<MyCardEntity> my_card) {
        this.my_card = my_card;
    }
    public void setMy_movie(List<MyMovieEntity> my_movie) {
        this.my_movie = my_movie;
    }
    public void setMy_seat_select(List<MySeatSelectEntity> my_seat_select) {
        this.my_seat_select = my_seat_select;
    }

    public int getId() {
        return id;
    }
    public List<MyCardEntity> getMy_card() {
        return my_card;
    }
    public List<MyMovieEntity> getMy_movie() {
        return my_movie;
    }
    public List<MySeatSelectEntity> getMy_seat_select() {
        return my_seat_select;
    }
}
