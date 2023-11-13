package com.example.backend.repository;

import com.example.backend.entity.MyCardEntity;
import com.example.backend.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;

public interface MyCardRepo extends CrudRepository<MyCardEntity, Integer> {
}
