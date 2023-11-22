package com.example.backend.model;

import com.example.backend.entity.SliderEntity;

public class Slider {
    private int id;
    private String image;
    private int movie_id;
    private String title;
    private String text;
    private String text_button;
    private String link;

    public Slider() {
    }

    public static Slider toModel(SliderEntity entity) {
        Slider model = new Slider();
        model.setId(entity.getId());
        model.setImage(entity.getImage());
        model.setMovie_id(entity.getMovie_id());
        model.setTitle(entity.getTitle());
        model.setText(entity.getText());
        model.setText_button(entity.getText_button());
        model.setLink(entity.getLink());
        return model;
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public void setMovie_id(int movie_id) {
        this.movie_id = movie_id;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public void setText(String text) {
        this.text = text;
    }
    public void setText_button(String text_button) {
        this.text_button = text_button;
    }
    public void setLink(String link) {
        this.link = link;
    }

    public int getId() {
        return id;
    }
    public String getImage() {
        return image;
    }
    public int getMovie_id() {
        return movie_id;
    }
    public String getTitle() {
        return title;
    }
    public String getText() {
        return text;
    }
    public String getText_button() {
        return text_button;
    }
    public String getLink() {
        return link;
    }
}
