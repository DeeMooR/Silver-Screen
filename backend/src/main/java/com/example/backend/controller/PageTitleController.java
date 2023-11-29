package com.example.backend.controller;

import com.example.backend.entity.PageTitleEntity;
import com.example.backend.entity.SliderEntity;
import com.example.backend.exception.MyException;
import com.example.backend.service.PageTitleService;
import com.example.backend.service.SliderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/page_title")
public class PageTitleController {

    @Autowired
    private PageTitleService pageTitleService;

    @PostMapping
    public ResponseEntity addPageTitle(@RequestBody PageTitleEntity pageTitle) {
        try {
            return ResponseEntity.ok(pageTitleService.add(pageTitle));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping("/{page}")
    public ResponseEntity getOnePageTitle(@PathVariable String page) {
        try {
            return ResponseEntity.ok(pageTitleService.getOne(page));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping
    public ResponseEntity getAllPageTitle() {
        try {
            return ResponseEntity.ok(pageTitleService.getAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
}
