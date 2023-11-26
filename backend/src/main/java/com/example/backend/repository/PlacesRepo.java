package com.example.backend.repository;

import com.example.backend.entity.PlacesEntity;
import org.springframework.data.repository.CrudRepository;

public interface PlacesRepo extends CrudRepository<PlacesEntity, Integer> {
}
