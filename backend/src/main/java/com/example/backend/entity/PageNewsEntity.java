package com.example.backend.entity;

import javax.persistence.*;

@Entity
@Table(name = "page_news")
public class PageNewsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String page;
    private String image;
    private String background_image;
    private String title;
    private String description;
    private String date;
    private String link;

    public PageNewsEntity() {
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setPage(String page) {
        this.page = page;
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
    public String getPage() {
        return page;
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