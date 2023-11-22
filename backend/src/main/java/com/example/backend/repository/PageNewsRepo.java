package com.example.backend.repository;

import com.example.backend.entity.PageNewsEntity;
import org.springframework.data.repository.CrudRepository;

public interface PageNewsRepo extends CrudRepository<PageNewsEntity, Integer> {
}
