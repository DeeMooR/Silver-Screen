package com.example.backend.controller;

import com.example.backend.entity.GenreEntity;
import com.example.backend.entity.SliderEntity;
import com.example.backend.exception.MyException;
import com.example.backend.service.GenreService;
import com.example.backend.service.SliderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/slider")
public class SliderController {

    @Autowired
    private SliderService sliderService;

    @PostMapping
    public ResponseEntity addSlide(@RequestBody SliderEntity slider) {
        try {
            return ResponseEntity.ok(sliderService.add(slider));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity getOneSlide(@PathVariable int id) {
        try {
            return ResponseEntity.ok(sliderService.getOne(id));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping
    public ResponseEntity getAllSlide() {
        try {
            return ResponseEntity.ok(sliderService.getAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
}
