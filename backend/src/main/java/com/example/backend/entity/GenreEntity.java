package com.example.backend.entity;

import javax.persistence.*;

@Entity
@Table(name = "genre")
public class GenreEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private MovieEntity movie;


    public GenreEntity() {
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setMovie(MovieEntity movie) {
        this.movie = movie;
    }

    public int getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public MovieEntity getMovie() {
        return movie;
    }
}