package com.example.backend.entity;

import com.example.backend.model.Genre;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "movie")
public class MovieEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String image;
    private String title;
    private int age;
    private String language;
    private boolean sub;
    private String video;
    private int duration;
    private String description;
    private String trailer;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "movie")
    private List<GenreEntity> genres;

    public MovieEntity() {
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public void setLanguage(String language) {
        this.language = language;
    }
    public void setSub(boolean sub) {
        this.sub = sub;
    }
    public void setVideo(String video) {
        this.video = video;
    }
    public void setDuration(int duration) {
        this.duration = duration;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public void setTrailer(String trailer) {
        this.trailer = trailer;
    }
    public void setGenres(List<GenreEntity> genres) {
        this.genres = genres;
    }

    public int getId() {
        return id;
    }
    public String getImage() {
        return image;
    }
    public String getTitle() {
        return title;
    }
    public int getAge() {
        return age;
    }
    public String getLanguage() {
        return language;
    }
    public boolean isSub() {
        return sub;
    }
    public String getVideo() {
        return video;
    }
    public int getDuration() {
        return duration;
    }
    public String getDescription() {
        return description;
    }
    public String getTrailer() {
        return trailer;
    }
    public List<GenreEntity> getGenres() {
        return genres;
    }
}