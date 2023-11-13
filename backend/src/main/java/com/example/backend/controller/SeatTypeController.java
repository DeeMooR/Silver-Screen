package com.example.backend.controller;

import com.example.backend.entity.GiftCardEntity;
import com.example.backend.entity.SeatTypeEntity;
import com.example.backend.exception.MyException;
import com.example.backend.service.GiftCardService;
import com.example.backend.service.SeatTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/seat_type")
public class SeatTypeController {

    @Autowired
    private SeatTypeService seatTypeService;

    @PostMapping
    public ResponseEntity addSeatType(@RequestBody SeatTypeEntity seat_type) {
        try {
            return ResponseEntity.ok(seatTypeService.add(seat_type));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping
    public ResponseEntity getAllSeatType() {
        try {
            return ResponseEntity.ok(seatTypeService.getAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
}
