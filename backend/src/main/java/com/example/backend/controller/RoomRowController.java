package com.example.backend.controller;

import com.example.backend.entity.RoomEntity;
import com.example.backend.entity.RoomRowEntity;
import com.example.backend.exception.MyException;
import com.example.backend.service.RoomRowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/room_row")
public class RoomRowController {

    @Autowired
    private RoomRowService roomRowService;

    @PostMapping
    public ResponseEntity addRoomRow(@RequestBody RoomRowEntity room_row,
                                     @RequestHeader("room_id") int room_id,
                                     @RequestHeader("type_id") String type_id) {
        try {
            return ResponseEntity.ok(roomRowService.add(room_row, room_id, type_id));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping
    public ResponseEntity getAllRow() {
        try {
            return ResponseEntity.ok(roomRowService.getAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
}
