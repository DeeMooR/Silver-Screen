package com.example.backend.controller;

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
}
