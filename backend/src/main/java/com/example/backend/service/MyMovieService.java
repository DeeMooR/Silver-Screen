package com.example.backend.service;

import com.example.backend.entity.*;
import com.example.backend.exception.MyException;
import com.example.backend.model.MyCard;
import com.example.backend.model.MyMovie;
import com.example.backend.model.RoomRow;
import com.example.backend.repository.MyMovieRepo;
import com.example.backend.repository.SeatTypeRepo;
import com.example.backend.repository.UserRepo;
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

    public MyMovie add(MyMovieEntity movie, int userId) {
        UserEntity user = userRepo.findById(userId).get();
        movie.setUser(user);
        return MyMovie.toModel(myMovieRepo.save(movie));
    }

    public MyMovie add(MyMovieEntity movie, int user_id, String type_id) throws MyException {
        Optional<UserEntity> findUser = userRepo.findById(user_id);
        if (!findUser.isPresent()) {
            throw new MyException("Ошибка в получение user");
        }
        movie.setUser(findUser.get());

        SeatTypeEntity seatType = seatTypeRepo.findByType(type_id);
        if (seatType == null) {
            throw new MyException("Ошибка в получение type");
        }
        movie.setType(seatType);

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
