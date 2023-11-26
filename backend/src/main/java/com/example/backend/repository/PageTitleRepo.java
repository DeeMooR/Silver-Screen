package com.example.backend.repository;

import com.example.backend.entity.PageTitleEntity;
import org.springframework.data.repository.CrudRepository;

public interface PageTitleRepo extends CrudRepository<PageTitleEntity, String> {
    PageTitleEntity findByPage(String page);
}
