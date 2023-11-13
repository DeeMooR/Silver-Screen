package com.example.backend.controller;

import com.example.backend.entity.GiftCardEntity;
import com.example.backend.entity.MyCardEntity;
import com.example.backend.exception.MyException;
import com.example.backend.service.GiftCardService;
import com.example.backend.service.MyCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/gift_card")
public class GiftCardController {

    @Autowired
    private GiftCardService giftCardService;

    @PostMapping
    public ResponseEntity addGiftCard(@RequestBody GiftCardEntity card) {
        try {
            return ResponseEntity.ok(giftCardService.add(card));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity getOneGiftCard(@PathVariable int id) {
        try {
            return ResponseEntity.ok(giftCardService.getOne(id));
        } catch (MyException e) {
            System.out.println("MyException");
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            System.out.println("Exception");
            return ResponseEntity.badRequest().body("Error");
        }
    }
}
