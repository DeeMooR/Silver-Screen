package com.example.backend.entity;

import javax.persistence.*;

@Entity
@Table(name = "seat_type")
public class SeatTypeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String type;
    private String image;
    private String image_select;
    private String description;

    public SeatTypeEntity() {
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setType(String type) {
        this.type = type;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public void setImageSelect(String image_select) {
        this.image_select = image_select;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public int getId() {
        return id;
    }
    public String getType() {
        return type;
    }
    public String getImage() {
        return image;
    }
    public String getImageSelect() {
        return image_select;
    }
    public String getDescription() {
        return description;
    }
}