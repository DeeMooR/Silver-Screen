package com.example.backend.repository;

import com.example.backend.entity.GenreEntity;
import com.example.backend.entity.MovieEntity;
import org.springframework.data.repository.CrudRepository;

public interface GenreRepo extends CrudRepository<GenreEntity, Integer> {
}
