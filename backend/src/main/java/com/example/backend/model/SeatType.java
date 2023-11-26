package com.example.backend.model;

import com.example.backend.entity.RoomEntity;
import com.example.backend.entity.SeatTypeEntity;

import java.util.List;
import java.util.stream.Collectors;

public class SeatType {
    private String type;
    private String image;
    private String image_select;
    private String description;

    public SeatType() {
    }

    public static SeatType toModel(SeatTypeEntity entity) {
        SeatType model = new SeatType();
        model.setType(entity.getType());
        model.setImage(entity.getImage());
        model.setImageSelect(entity.getImageSelect());
        model.setDescription(entity.getDescription());
        return model;
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
