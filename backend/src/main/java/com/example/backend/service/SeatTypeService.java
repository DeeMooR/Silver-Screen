package com.example.backend.service;

import com.example.backend.entity.SeatTypeEntity;
import com.example.backend.entity.UserEntity;
import com.example.backend.exception.MyException;
import com.example.backend.model.SeatType;
import com.example.backend.model.User;
import com.example.backend.repository.SeatTypeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class SeatTypeService {

    @Autowired
    private SeatTypeRepo seatTypeRepo;

    public SeatType add(SeatTypeEntity seat_type) throws MyException {
        if (seatTypeRepo.findByType(seat_type.getType()) != null) {
            throw new MyException("Такой тип места уже существует");
        }
        return SeatType.toModel(seatTypeRepo.save(seat_type));
    }

    public List<SeatType> getAll() {
        Iterable<SeatTypeEntity> seatTypeEntities = seatTypeRepo.findAll();
        return StreamSupport.stream(seatTypeEntities.spliterator(), false)
                .map(SeatType::toModel)
                .collect(Collectors.toList());
    }
}
