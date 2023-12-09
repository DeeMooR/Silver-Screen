package com.example.backend.controller;

import com.example.backend.entity.MovieEntity;
import com.example.backend.entity.MyCardEntity;
import com.example.backend.exception.MyException;
import com.example.backend.service.GenreService;
import com.example.backend.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/genre")
public class GenreController {

    @Autowired
    private GenreService genreService;

    @PostMapping
    public ResponseEntity addGenre(@RequestBody String name,
                                   @RequestHeader("movie_id") int movie_id) {
        try {
            genreService.add(name, movie_id);
            return ResponseEntity.ok("Жанр '" + name + "' добавлен к фильму id=" + movie_id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
}
