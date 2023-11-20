package com.example.backend.service;

import com.example.backend.entity.MovieEntity;
import com.example.backend.entity.RoomEntity;
import com.example.backend.exception.MyException;
import com.example.backend.model.Movie;
import com.example.backend.model.Room;
import com.example.backend.repository.MovieRepo;
import com.example.backend.repository.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class MovieService {

    @Autowired
    private MovieRepo movieRepo;

    public MovieEntity add(MovieEntity movie) {
        return movieRepo.save(movie);
    }

    public Movie getOne(int id) throws MyException {
        Optional<MovieEntity> movie = movieRepo.findById(id);
        if (!movie.isPresent()) {
            throw new MyException("Фильм не найден");
        }
        return Movie.toModel(movie.get());
    }

    public List<Movie> getAll() {
        Iterable<MovieEntity> movieEntities = movieRepo.findAll();
        return StreamSupport.stream(movieEntities.spliterator(), false)
                .map(Movie::toModel)
                .collect(Collectors.toList());
    }
}
