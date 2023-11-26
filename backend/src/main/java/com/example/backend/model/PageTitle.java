package com.example.backend.model;

import com.example.backend.entity.PageTitleEntity;

public class PageTitle {
    private String page;
    private String image;
    private String title;
    private String text;

    public PageTitle() {
    }

    public static PageTitle toModel(PageTitleEntity entity) {
        PageTitle model = new PageTitle();
        model.setPage(entity.getPage());
        model.setImage(entity.getImage());
        model.setTitle(entity.getTitle());
        model.setText(entity.getText());
        return model;
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
