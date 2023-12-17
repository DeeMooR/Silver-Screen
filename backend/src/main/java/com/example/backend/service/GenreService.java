package com.example.backend.service;

import com.example.backend.entity.MovieEntity;
import com.example.backend.entity.ScheduleEntity;
import com.example.backend.entity.GenreEntity;
import com.example.backend.exception.MyException;
import com.example.backend.model.MyCard;
import com.example.backend.model.Schedule;
import com.example.backend.modelShort.ScheduleShort;
import com.example.backend.repository.GenreRepo;
import com.example.backend.repository.MovieRepo;
import com.example.backend.repository.ScheduleRepo;
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

    public void add(String name, int movie_id) throws MyException {
        name = name.substring(1, name.length() - 1);    // удаляем лишние "
        GenreEntity genre = new GenreEntity();
        Optional<MovieEntity> findMovie = movieRepo.findById(movie_id);
        if (!findMovie.isPresent()) {
            throw new MyException("Ошибка в получение movie");
        }
        genre.setName(name);
        genre.setMovie(findMovie.get());
        genreRepo.save(genre);
    }
}
