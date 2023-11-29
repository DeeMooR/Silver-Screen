package com.example.backend.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "user")
public class UserEntity {
    @Id
    private int id;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<MyCardEntity> myCards;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<MyMovieEntity> myMovies;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<MySeatSelectEntity> mySeatSelect;

    public UserEntity() {
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setMyCards(List<MyCardEntity> myCards) {
        this.myCards = myCards;
    }
    public void setMyMovies(List<MyMovieEntity> myMovies) {
        this.myMovies = myMovies;
    }
    public void setMySeatSelect(List<MySeatSelectEntity> mySeatSelect) {
        this.mySeatSelect = mySeatSelect;
    }

    public int getId() {
        return id;
    }
    public List<MyCardEntity> getMyCards() {
        return myCards;
    }
    public List<MyMovieEntity> getMyMovies() {
        return myMovies;
    }
    public List<MySeatSelectEntity> getMySeatSelect() {
        return mySeatSelect;
    }
}
