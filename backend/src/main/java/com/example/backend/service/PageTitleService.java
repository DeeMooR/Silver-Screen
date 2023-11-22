package com.example.backend.service;

import com.example.backend.entity.PageTitleEntity;
import com.example.backend.exception.MyException;
import com.example.backend.model.PageTitle;
import com.example.backend.repository.PageTitleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class PageTitleService {

    @Autowired
    private PageTitleRepo pageTitleRepo;

    public PageTitle add(PageTitleEntity pageTitle) throws MyException {
        if (pageTitleRepo.findByPage(pageTitle.getPage()) != null) {
            throw new MyException("У этой страницы уже есть заголовок");
        }
        return PageTitle.toModel(pageTitleRepo.save(pageTitle));
    }

    public PageTitle getOne(String page) throws MyException {
        PageTitleEntity pageTitle = pageTitleRepo.findByPage(page);
        if (pageTitle == null) {
            throw new MyException("У этой страницы нет заголовка");
        }
        return PageTitle.toModel(pageTitle);
    }

    public List<PageTitle> getAll() {
        Iterable<PageTitleEntity> pageTitleEntities = pageTitleRepo.findAll();
        return StreamSupport.stream(pageTitleEntities.spliterator(), false)
                .map(PageTitle::toModel)
                .collect(Collectors.toList());
    }
}
