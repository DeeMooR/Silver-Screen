package com.example.backend.controller;

import com.example.backend.entity.PlacesEntity;
import com.example.backend.entity.UserEntity;
import com.example.backend.exception.MyException;
import com.example.backend.service.PlacesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/places")
public class PlacesController {

    @Autowired
    private PlacesService placesService;

    @PostMapping
    public ResponseEntity addNumbers(@RequestBody int[] numbers,
                                     @RequestHeader("seance_id") int seance_id) {
        try {
            return ResponseEntity.ok(placesService.add(numbers, seance_id));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity getOneNumbers(@PathVariable int id) {
        try {
            return ResponseEntity.ok(placesService.getOne(id));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping
    public ResponseEntity getAllNumbers() {
        try {
            return ResponseEntity.ok(placesService.getAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @PutMapping
    public ResponseEntity changePlace(@RequestBody int set_number,
                                      @RequestHeader("seance_id") int seance_id,
                                      @RequestHeader("index_row") int index_row,
                                      @RequestHeader("index_column") int index_column) {
        try {
            return ResponseEntity.ok(placesService.change(set_number, seance_id, index_row, index_column));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
}
