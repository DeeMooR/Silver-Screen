package com.example.backend.controller;

import com.example.backend.entity.MyMovieEntity;
import com.example.backend.entity.RoomRowEntity;
import com.example.backend.exception.MyException;
import com.example.backend.service.MyMovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/my_movie")
public class MyMovieController {

    @Autowired
    private MyMovieService myMovieService;

    @PostMapping
    public ResponseEntity addMyMovie(@RequestBody MyMovieEntity movie,
                                     @RequestHeader("user_id") int user_id,
                                     @RequestHeader("type_id") String type_id,
                                     @RequestHeader("movie_id") int movie_id,
                                     @RequestHeader("seance_id") int seance_id) {
        try {
            return ResponseEntity.ok(myMovieService.add(movie, user_id, type_id, movie_id, seance_id));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity getOneMyMovie(@PathVariable int id) {
        try {
            return ResponseEntity.ok(myMovieService.getOne(id));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping
    public ResponseEntity getAllMyMovie() {
        try {
            return ResponseEntity.ok(myMovieService.getAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
}
