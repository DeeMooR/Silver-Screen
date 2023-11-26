package com.example.backend.controller;

import com.example.backend.entity.GenreEntity;
import com.example.backend.entity.ScheduleEntity;
import com.example.backend.exception.MyException;
import com.example.backend.service.GenreService;
import com.example.backend.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/schedule")
public class SheduleController {

    @Autowired
    private ScheduleService scheduleService;
    @PostMapping
    public ResponseEntity addSchedule(@RequestBody ScheduleEntity schedule,
                                    @RequestHeader("movie_id") int movie_id) {
        try {
            scheduleService.add(schedule, movie_id);
            return ResponseEntity.ok("Дата показа фильма сохранена");
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping
    public ResponseEntity getAllSchedule() {
        try {
            return ResponseEntity.ok(scheduleService.getAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
}
