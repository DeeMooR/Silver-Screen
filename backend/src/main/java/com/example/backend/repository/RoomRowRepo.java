package com.example.backend.repository;

import com.example.backend.entity.RoomRowEntity;
import org.springframework.data.repository.CrudRepository;

public interface RoomRowRepo extends CrudRepository<RoomRowEntity, Integer> {
}
