package com.example.backend.controller;

import com.example.backend.entity.MyMovieEntity;
import com.example.backend.entity.MySeatSelectEntity;
import com.example.backend.exception.MyException;
import com.example.backend.service.MySeatSelectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/my_seat_select")
public class MySeatSelectController {

    @Autowired
    private MySeatSelectService mySeatSelectService;

    @PostMapping
    public ResponseEntity addMySeatSelect(@RequestBody MySeatSelectEntity seat,
                                          @RequestHeader("user_id") int user_id,
                                          @RequestHeader("seance_id") int seance_id) {
        try {
            return ResponseEntity.ok(mySeatSelectService.add(seat, user_id, seance_id));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity getOneMySeatSelect(@PathVariable int id) {
        try {
            return ResponseEntity.ok(mySeatSelectService.getOne(id));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping
    public ResponseEntity getAllMySeatSelect() {
        try {
            return ResponseEntity.ok(mySeatSelectService.getAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
}
