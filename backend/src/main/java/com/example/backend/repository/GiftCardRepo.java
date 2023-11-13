package com.example.backend.repository;

import com.example.backend.entity.GiftCardEntity;
import org.springframework.data.repository.CrudRepository;

public interface GiftCardRepo extends CrudRepository<GiftCardEntity, Integer> {
}
