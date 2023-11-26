package com.example.backend.repository;

import com.example.backend.entity.GenreEntity;
import com.example.backend.entity.ScheduleEntity;
import org.springframework.data.repository.CrudRepository;

public interface ScheduleRepo extends CrudRepository<ScheduleEntity, Integer> {
}
