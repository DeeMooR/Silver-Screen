package com.example.backend.repository;

import com.example.backend.entity.SeatTypeEntity;
import com.example.backend.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;

public interface SeatTypeRepo extends CrudRepository<SeatTypeEntity, String> {
    SeatTypeEntity findByType(String type);
}
