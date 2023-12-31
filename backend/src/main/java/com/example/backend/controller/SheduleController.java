package com.example.backend.controller;

import com.example.backend.entity.ScheduleEntity;
import com.example.backend.exception.MyException;
import com.example.backend.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000"})
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
            return ResponseEntity.ok("Дата показа фильма сохранена id=" + schedule.getId());
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping("/all")
    public ResponseEntity getAllSchedule() {
        try {
            return ResponseEntity.ok(scheduleService.getAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping
    public ResponseEntity getOneMovieSchedule(@RequestHeader("movie_id") int movie_id) {
        try {
            return ResponseEntity.ok(scheduleService.getArrOneMovie(movie_id));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
}
