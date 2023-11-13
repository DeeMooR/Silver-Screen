package com.example.backend.service;

import com.example.backend.entity.UserEntity;
import com.example.backend.exception.MyException;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public UserEntity registration(UserEntity user) throws MyException {
        if (userRepo.findByUsername(user.getUsername()) != null) {
            throw new MyException("Пользователь с таким именем уже существует");
        }
        return userRepo.save(user);
    }

    public User getOne(int id) throws MyException {
        Optional<UserEntity> user = userRepo.findById(id);
        if (!user.isPresent()) {
            throw new MyException("Пользователь не найден");
        }
        return User.toModel(user.get());
    }

    public int delete(int id) {
        userRepo.deleteById(id);
        return id;
    }
}
