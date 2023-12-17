package com.example.backend.model;

import com.example.backend.entity.GenreEntity;
import com.example.backend.entity.MovieEntity;
import com.example.backend.modelShort.ScheduleShort;
import com.example.backend.modelShort.ScheduleWithoutSeance;

import java.util.List;
import java.util.stream.Collectors;

public class Movie {
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
    private List<String> genres;
    private List<ScheduleWithoutSeance> schedule;

    public Movie() {
    }

    public static Movie toModel(MovieEntity entity) {
        Movie model = new Movie();
        model.setId(entity.getId());
        model.setImage(entity.getImage());
        model.setTitle(entity.getTitle());
        model.setAge(entity.getAge());
        model.setLanguage(entity.getLanguage());
        model.setSub(entity.isSub());
        model.setVideo(entity.getVideo());
        model.setDuration(entity.getDuration());
        model.setDescription(entity.getDescription());
        model.setTrailer(entity.getTrailer());
        model.setGenres(entity.getGenres().stream().map(item -> item.getName()).collect(Collectors.toList()));
        model.setSchedule(entity.getSchedule().stream().map(ScheduleWithoutSeance::toModel).collect(Collectors.toList()));
        return model;
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
    public void setGenres(List<String> genres) {
        this.genres = genres;
    }
    public void setSchedule(List<ScheduleWithoutSeance> schedule) {
        this.schedule = schedule;
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
    public List<String> getGenres() {
        return genres;
    }
    public List<ScheduleWithoutSeance> getSchedule() {
        return schedule;
    }
}
