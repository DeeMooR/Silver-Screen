package com.example.backend.model;

import com.example.backend.entity.GenreEntity;
import com.example.backend.entity.MovieEntity;

public class Genre {
    private int id;
    private String name;
    private int movie_id;

    public Genre() {
    }

    public static Genre toModel(GenreEntity entity) {
        Genre model = new Genre();
        model.setId(entity.getId());
        model.setName(entity.getName());
        model.setMovie_id(entity.getMovie().getId());
        return model;
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setMovie_id(int movie_id) {
        this.movie_id = movie_id;
    }

    public int getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public int getMovie_id() {
        return movie_id;
    }
}
