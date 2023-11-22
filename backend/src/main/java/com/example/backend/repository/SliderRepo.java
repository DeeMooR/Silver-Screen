package com.example.backend.repository;

import com.example.backend.entity.GenreEntity;
import com.example.backend.entity.SliderEntity;
import org.springframework.data.repository.CrudRepository;

public interface SliderRepo extends CrudRepository<SliderEntity, Integer> {
}
