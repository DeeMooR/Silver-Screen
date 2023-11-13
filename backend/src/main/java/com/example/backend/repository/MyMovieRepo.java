package com.example.backend.repository;

import com.example.backend.entity.MyCardEntity;
import com.example.backend.entity.MyMovieEntity;
import org.springframework.data.repository.CrudRepository;

public interface MyMovieRepo extends CrudRepository<MyMovieEntity, Integer> {
}
