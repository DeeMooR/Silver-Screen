package com.example.backend.controller;

import com.example.backend.entity.MovieEntity;
import com.example.backend.entity.SeatTypeEntity;
import com.example.backend.exception.MyException;
import com.example.backend.service.MovieService;
import com.example.backend.service.SeatTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/movie")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @PostMapping
    public ResponseEntity addMovie(@RequestBody MovieEntity movie) {
        try {
            return ResponseEntity.ok(movieService.add(movie));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity getOneMovie(@PathVariable int id) {
        try {
            return ResponseEntity.ok(movieService.getOne(id));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping
    public ResponseEntity getAllMovie() {
        try {
            return ResponseEntity.ok(movieService.getAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
}
