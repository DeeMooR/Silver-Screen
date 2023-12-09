package com.example.backend.repository;

import com.example.backend.entity.GenreEntity;
import org.springframework.data.repository.CrudRepository;

public interface GenreRepo extends CrudRepository<GenreEntity, Integer> {
}
