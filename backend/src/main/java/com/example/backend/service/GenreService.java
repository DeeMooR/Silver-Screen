package com.example.backend.service;

import com.example.backend.entity.*;
import com.example.backend.exception.MyException;
import com.example.backend.model.Genre;
import com.example.backend.model.Movie;
import com.example.backend.model.MyMovie;
import com.example.backend.repository.GenreRepo;
import com.example.backend.repository.MovieRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class GenreService {

    @Autowired
    private GenreRepo genreRepo;
    @Autowired
    private MovieRepo movieRepo;

    public Genre add(GenreEntity genre, int movie_id) throws MyException {
        Optional<MovieEntity> findMovie = movieRepo.findById(movie_id);
        if (!findMovie.isPresent()) {
            throw new MyException("Ошибка в получение movie");
        }
        genre.setMovie(findMovie.get());
        return Genre.toModel(genreRepo.save(genre));
    }

    public List<Genre> getAll() {
        Iterable<GenreEntity> genreEntities = genreRepo.findAll();
        return StreamSupport.stream(genreEntities.spliterator(), false)
                .map(Genre::toModel)
                .collect(Collectors.toList());
    }
}
