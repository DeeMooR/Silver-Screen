package com.example.backend.repository;

import com.example.backend.entity.RoomEntity;
import org.springframework.data.repository.CrudRepository;

public interface RoomRepo extends CrudRepository<RoomEntity, Integer> {
}
