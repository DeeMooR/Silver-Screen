package com.example.backend.entity;

import javax.persistence.*;

@Entity
@Table(name = "page_title")
public class PageTitleEntity {
    @Id
    private String page;
    private String image;
    private String title;
    private String text;

    public PageTitleEntity() {
    }

    public void setPage(String page) {
        this.page = page;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public void setText(String text) {
        this.text = text;
    }

    public String getPage() {
        return page;
    }
    public String getImage() {
        return image;
    }
    public String getTitle() {
        return title;
    }
    public String getText() {
        return text;
    }
}