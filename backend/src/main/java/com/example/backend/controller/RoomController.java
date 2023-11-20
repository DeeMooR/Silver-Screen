package com.example.backend.controller;

import com.example.backend.entity.RoomEntity;
import com.example.backend.entity.SeatTypeEntity;
import com.example.backend.exception.MyException;
import com.example.backend.service.RoomService;
import com.example.backend.service.SeatTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/room")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping
    public ResponseEntity addRoom(@RequestBody RoomEntity room) {
        try {
            return ResponseEntity.ok(roomService.add(room));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity getOneRoom(@PathVariable int id) {
        try {
            return ResponseEntity.ok(roomService.getOne(id));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping
    public ResponseEntity getAllRoom() {
        try {
            return ResponseEntity.ok(roomService.getAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
}
