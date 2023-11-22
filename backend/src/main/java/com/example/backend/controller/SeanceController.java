package com.example.backend.controller;

import com.example.backend.entity.ScheduleEntity;
import com.example.backend.entity.SeanceEntity;
import com.example.backend.exception.MyException;
import com.example.backend.service.ScheduleService;
import com.example.backend.service.SeanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/seance")
public class SeanceController {

    @Autowired
    private SeanceService seanceService;
    @PostMapping
    public ResponseEntity addSeance(@RequestBody SeanceEntity seance,
                                    @RequestHeader("schedule_id") int schedule_id,
                                    @RequestHeader("room_id") int room_id) {
        try {
            return ResponseEntity.ok(seanceService.add(seance, schedule_id, room_id));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping
    public ResponseEntity getAllSeance() {
        try {
            return ResponseEntity.ok(seanceService.getAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
}
