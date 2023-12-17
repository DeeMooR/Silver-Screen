package com.example.backend.controller;

import com.example.backend.entity.MyCardEntity;
import com.example.backend.entity.MyMovieEntity;
import com.example.backend.exception.MyException;
import com.example.backend.service.MyCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/my_card")
public class MyCardController {

    @Autowired
    private MyCardService myCardService;

    @PostMapping
    public ResponseEntity addMyCard(@RequestBody MyCardEntity card,
                                     @RequestHeader("user_id") int user_id,
                                     @RequestHeader("card_id") int card_id) {
        try {
            return ResponseEntity.ok(myCardService.add(card, user_id, card_id));
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

    @PutMapping("/status")
    public ResponseEntity changeStatusMyCard(@RequestHeader("user_id") int user_id,
                                             @RequestHeader("number_card") int number_card) {
        try {
            return ResponseEntity.ok(myCardService.changeStatus(user_id, number_card));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
}
