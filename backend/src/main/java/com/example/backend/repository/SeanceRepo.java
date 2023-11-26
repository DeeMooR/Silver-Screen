package com.example.backend.repository;

import com.example.backend.entity.ScheduleEntity;
import com.example.backend.entity.SeanceEntity;
import org.springframework.data.repository.CrudRepository;

public interface SeanceRepo extends CrudRepository<SeanceEntity, Integer> {
}
