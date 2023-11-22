package com.example.backend.controller;

import com.example.backend.entity.PageNewsEntity;
import com.example.backend.entity.PageTitleEntity;
import com.example.backend.exception.MyException;
import com.example.backend.service.PageNewsService;
import com.example.backend.service.PageTitleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/page_news")
public class PageNewsController {

    @Autowired
    private PageNewsService pageNewsService;

    @PostMapping
    public ResponseEntity addPageNews(@RequestBody PageNewsEntity pageNews) {
        try {
            return ResponseEntity.ok(pageNewsService.add(pageNews));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity getOnePageNews(@PathVariable int id) {
        try {
            return ResponseEntity.ok(pageNewsService.getOne(id));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping
    public ResponseEntity getAllPageNews() {
        try {
            return ResponseEntity.ok(pageNewsService.getAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
}
