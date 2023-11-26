package com.example.backend.service;

import com.example.backend.entity.PageNewsEntity;
import com.example.backend.entity.PageTitleEntity;
import com.example.backend.exception.MyException;
import com.example.backend.model.PageNews;
import com.example.backend.model.PageTitle;
import com.example.backend.repository.PageNewsRepo;
import com.example.backend.repository.PageTitleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class PageNewsService {

    @Autowired
    private PageNewsRepo pageNewsRepo;

    public PageNews add(PageNewsEntity pageNews) throws MyException {
        return PageNews.toModel(pageNewsRepo.save(pageNews));
    }

    public PageNews getOne(int id) throws MyException {
        Optional<PageNewsEntity> pageNews = pageNewsRepo.findById(id);
        if (!pageNews.isPresent()) {
            throw new MyException("Новость не найдена");
        }
        return PageNews.toModel(pageNews.get());
    }

    public List<PageNews> getAll() {
        Iterable<PageNewsEntity> pageNewsEntities = pageNewsRepo.findAll();
        return StreamSupport.stream(pageNewsEntities.spliterator(), false)
                .map(PageNews::toModel)
                .collect(Collectors.toList());
    }
}
