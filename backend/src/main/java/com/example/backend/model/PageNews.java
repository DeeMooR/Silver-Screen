package com.example.backend.model;

import com.example.backend.entity.PageNewsEntity;

public class PageNews {
    private int id;
    private String image;
    private String background_image;
    private String title;
    private String description;
    private String date;
    private String link;

    public PageNews() {
    }

    public static PageNews toModel(PageNewsEntity entity) {
        PageNews model = new PageNews();
        model.setId(entity.getId());
        model.setImage(entity.getImage());
        model.setBackground_image(entity.getBackground_image());
        model.setTitle(entity.getTitle());
        model.setDescription(entity.getDescription());
        model.setDate(entity.getDate());
        model.setLink(entity.getLink());
        return model;
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public void setBackground_image(String background_image) {
        this.background_image = background_image;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public void setDate(String date) {
        this.date = date;
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
    public String getBackground_image() {
        return background_image;
    }
    public String getTitle() {
        return title;
    }
    public String getDescription() {
        return description;
    }
    public String getDate() {
        return date;
    }
    public String getLink() {
        return link;
    }
}
