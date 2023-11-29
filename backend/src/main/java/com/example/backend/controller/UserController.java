package com.example.backend.controller;

import com.example.backend.entity.UserEntity;
import com.example.backend.exception.MyException;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired // для инициализации
    private UserService userService;

    @PostMapping
    public ResponseEntity addUser(@RequestBody UserEntity user) {
        try {
            userService.add(user);
            return ResponseEntity.ok("Пользователь успешно сохранён");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity getOneUser(@PathVariable int id) {
        try {
            return ResponseEntity.ok(userService.getOne(id));
        } catch (MyException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping
    public ResponseEntity getAllUser() {
        try {
            return ResponseEntity.ok(userService.getAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity deleteUser(@PathVariable int id) {
        try {
            userService.delete(id);
            return ResponseEntity.ok("Пользователь успешно удалён");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
}
