package com.example.backend.controller;

import com.example.backend.entity.GenreEntity;
import com.example.backend.entity.MovieEntity;
import com.example.backend.entity.MyCardEntity;
import com.example.backend.exception.MyException;
import com.example.backend.service.GenreService;
import com.example.backend.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/genre")
public class GenreController {

    @Autowired
    private GenreService genreService;

    @PostMapping
    public ResponseEntity addGenre(@RequestBody GenreEntity genre,
                                    @RequestHeader("movie_id") int movie_id) {
        try {
            return ResponseEntity.ok(genreService.add(genre, movie_id));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping
    public ResponseEntity getAllGenres() {
        try {
            return ResponseEntity.ok(genreService.getAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
}
