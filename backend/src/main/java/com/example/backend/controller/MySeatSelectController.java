package com.example.backend.controller;

import com.example.backend.entity.MySeatSelectEntity;
import com.example.backend.service.MySeatSelectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/my_seat_select")
public class MySeatSelectController {

    @Autowired
    private MySeatSelectService mySeatSelectService;

    @PostMapping("/{userId}")
    public ResponseEntity addMySeatSelect(@RequestBody MySeatSelectEntity seat, @PathVariable int userId) {
        try {
            return ResponseEntity.ok(mySeatSelectService.add(seat, userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
}
