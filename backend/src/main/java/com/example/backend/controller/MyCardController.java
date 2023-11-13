package com.example.backend.controller;

import com.example.backend.entity.MyCardEntity;
import com.example.backend.service.MyCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/my_card")
public class MyCardController {

    @Autowired
    private MyCardService myCardService;

    @PostMapping("/{userId}")
    public ResponseEntity addMyCard(@RequestBody MyCardEntity card, @PathVariable int userId) {
        try {
            return ResponseEntity.ok(myCardService.add(card, userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @PutMapping
    public ResponseEntity changeStatusMyCard(@RequestParam int id) {
        try {
            return ResponseEntity.ok(myCardService.changeStatus(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
}
