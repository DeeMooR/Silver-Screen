package com.example.backend.service;

import com.example.backend.entity.MyMovieEntity;
import com.example.backend.entity.UserEntity;
import com.example.backend.model.MyMovie;
import com.example.backend.repository.MyMovieRepo;
import com.example.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MyMovieService {

    @Autowired
    private MyMovieRepo myMovieRepo;
    @Autowired
    private UserRepo userRepo;

    public MyMovie add(MyMovieEntity movie, int userId) {
        UserEntity user = userRepo.findById(userId).get();
        movie.setUser(user);
        return MyMovie.toModel(myMovieRepo.save(movie));
    }
}
