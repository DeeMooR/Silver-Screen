package com.example.backend.service;

import com.example.backend.entity.*;
import com.example.backend.exception.MyException;
import com.example.backend.model.MyMovie;
import com.example.backend.model.Room;
import com.example.backend.model.User;
import com.example.backend.repository.MyMovieRepo;
import com.example.backend.repository.RoomRepo;
import com.example.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    private RoomRepo roomRepo;

    public RoomEntity add(RoomEntity room) throws MyException {
        Optional<RoomEntity> findRoom = roomRepo.findById(room.getId());
        if (findRoom.isPresent()) {
            throw new MyException("Такой зал уже существует");
        }
        return roomRepo.save(room);
    }

    public Room getOne(int id) throws MyException {
        Optional<RoomEntity> room = roomRepo.findById(id);
        if (!room.isPresent()) {
            throw new MyException("Зал не найден");
        }
        return Room.toModel(room.get());
    }
}
