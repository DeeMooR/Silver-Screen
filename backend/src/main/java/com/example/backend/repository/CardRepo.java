package com.example.backend.repository;

import com.example.backend.entity.CardEntity;
import org.springframework.data.repository.CrudRepository;

public interface CardRepo extends CrudRepository<CardEntity, Integer> {
}
