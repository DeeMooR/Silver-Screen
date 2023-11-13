package com.example.backend.controller;

import com.example.backend.entity.MyMovieEntity;
import com.example.backend.service.MyMovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/my_movie")
public class MyMovieController {

    @Autowired
    private MyMovieService myMovieService;

    @PostMapping("/{userId}")
    public ResponseEntity addMyMovie(@RequestBody MyMovieEntity movie, @PathVariable int userId) {
        try {
            return ResponseEntity.ok(myMovieService.add(movie, userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
}
