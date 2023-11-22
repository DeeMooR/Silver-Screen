package com.example.backend.service;

import com.example.backend.entity.GenreEntity;
import com.example.backend.entity.MovieEntity;
import com.example.backend.entity.ScheduleEntity;
import com.example.backend.exception.MyException;
import com.example.backend.model.Genre;
import com.example.backend.model.Schedule;
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
public class ScheduleService {

    @Autowired
    private ScheduleRepo scheduleRepo;
    @Autowired
    private MovieRepo movieRepo;

    public Schedule add(ScheduleEntity schedule, int movie_id) throws MyException {
        Optional<MovieEntity> findMovie = movieRepo.findById(movie_id);
        if (!findMovie.isPresent()) {
            throw new MyException("Ошибка в получение movie");
        }
        schedule.setMovie(findMovie.get());
        return Schedule.toModel(scheduleRepo.save(schedule));
    }

    public List<Schedule> getAll() {
        Iterable<ScheduleEntity> scheduleEntities = scheduleRepo.findAll();
        return StreamSupport.stream(scheduleEntities.spliterator(), false)
                .map(Schedule::toModel)
                .collect(Collectors.toList());
    }
}
