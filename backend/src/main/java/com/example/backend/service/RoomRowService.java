package com.example.backend.service;

import com.example.backend.entity.*;
import com.example.backend.exception.MyException;
import com.example.backend.model.MyMovie;
import com.example.backend.model.RoomRow;
import com.example.backend.repository.RoomRepo;
import com.example.backend.repository.RoomRowRepo;
import com.example.backend.repository.SeatTypeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static java.util.Arrays.stream;

@Service
public class RoomRowService {

    @Autowired
    private RoomRowRepo roomRowRepo;
    @Autowired
    private RoomRepo roomRepo;
    @Autowired
    private SeatTypeRepo seatTypeRepo;

    public RoomRow add(RoomRowEntity room_row, int room_id, String type_id) throws MyException {
        Optional<RoomEntity> findRoom = roomRepo.findById(room_id);
        if (!findRoom.isPresent()) {
            throw new MyException("Ошибка в получение room");
        }
        room_row.setRoom(findRoom.get());

        SeatTypeEntity seatType = seatTypeRepo.findByType(type_id);
        if (seatType == null) {
            throw new MyException("Ошибка в получение type");
        }
        room_row.setType(seatType);

        return RoomRow.toModel(roomRowRepo.save(room_row));
    }

    public List<RoomRow> getAll() {
        Iterable<RoomRowEntity> roomRowEntities = roomRowRepo.findAll();
        return StreamSupport.stream(roomRowEntities.spliterator(), false)
                .map(RoomRow::toModel)
                .collect(Collectors.toList());
    }
}
