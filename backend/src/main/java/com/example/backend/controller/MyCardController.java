package com.example.backend.controller;

import com.example.backend.entity.MyCardEntity;
import com.example.backend.entity.MyMovieEntity;
import com.example.backend.exception.MyException;
import com.example.backend.service.MyCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/my_card")
public class MyCardController {

    @Autowired
    private MyCardService myCardService;

    @PostMapping
    public ResponseEntity addMyCard(@RequestBody MyCardEntity card,
                                     @RequestHeader("user_id") int user_id,
                                     @RequestHeader("gift_card_id") int gift_card_id) {
        try {
            return ResponseEntity.ok(myCardService.add(card, user_id, gift_card_id));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity getOneMyCard(@PathVariable int id) {
        try {
            return ResponseEntity.ok(myCardService.getOne(id));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping
    public ResponseEntity getAllMyCard() {
        try {
            return ResponseEntity.ok(myCardService.getAll());
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
