package com.example.backend.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "seat_type")
public class SeatTypeEntity {
    @Id
    private String type;
    private String image;
    private String image_select;
    private String description;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "type")
    private List<MyMovieEntity> myMovies;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "type")
    private List<RoomRowEntity> rows;

    public SeatTypeEntity() {
    }

    public void setType(String type) {
        this.type = type;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public void setImage_select(String image_select) {
        this.image_select = image_select;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public void setMyMovies(List<MyMovieEntity> myMovies) {
        this.myMovies = myMovies;
    }
    public void setRows(List<RoomRowEntity> rows) {
        this.rows = rows;
    }

    public String getType() {
        return type;
    }
    public String getImage() {
        return image;
    }
    public String getImage_select() {
        return image_select;
    }
    public String getDescription() {
        return description;
    }
    public List<MyMovieEntity> getMyMovies() {
        return myMovies;
    }
    public List<RoomRowEntity> getRows() {
        return rows;
    }
}