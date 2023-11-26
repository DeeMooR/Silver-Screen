package com.example.backend.repository;

import com.example.backend.entity.MovieEntity;
import org.springframework.data.repository.CrudRepository;

public interface MovieRepo extends CrudRepository<MovieEntity, Integer> {
}
