package com.example.backend.service;

import com.example.backend.entity.*;
import com.example.backend.exception.MyException;
import com.example.backend.model.MyCard;
import com.example.backend.model.MyMovie;
import com.example.backend.model.RoomRow;
import com.example.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class MyMovieService {

    @Autowired
    private MyMovieRepo myMovieRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private SeatTypeRepo seatTypeRepo;
    @Autowired
    private MovieRepo movieRepo;
    @Autowired
    private SeanceRepo seanceRepo;

    public MyMovie add(MyMovieEntity movie, int user_id, String type_id, int movie_id, int seance_id) throws MyException {
        Optional<UserEntity> findUser = userRepo.findById(user_id);
        if (!findUser.isPresent()) {
            throw new MyException("Ошибка в получение user");
        }
        movie.setUser(findUser.get());

        SeatTypeEntity findSeatType = seatTypeRepo.findByType(type_id);
        if (findSeatType == null) {
            throw new MyException("Ошибка в получение type");
        }
        movie.setType(findSeatType);

        Optional<MovieEntity> findMovie = movieRepo.findById(movie_id);
        if (!findMovie.isPresent()) {
            throw new MyException("Ошибка в получение movie");
        }
        movie.setMovie(findMovie.get());

        Optional<SeanceEntity> findSeance = seanceRepo.findById(seance_id);
        if (!findSeance.isPresent()) {
            throw new MyException("Ошибка в получение seance");
        }
        movie.setSeance(findSeance.get());

        return MyMovie.toModel(myMovieRepo.save(movie));
    }

    public MyMovie getOne(int id) throws MyException {
        Optional<MyMovieEntity> myMovie = myMovieRepo.findById(id);
        if (!myMovie.isPresent()) {
            throw new MyException("Фильм не найден");
        }
        return MyMovie.toModel(myMovie.get());
    }

    public List<MyMovie> getAll() {
        Iterable<MyMovieEntity> myMovieEntities = myMovieRepo.findAll();
        return StreamSupport.stream(myMovieEntities.spliterator(), false)
                .map(MyMovie::toModel)
                .collect(Collectors.toList());
    }
}
