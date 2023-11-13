package com.example.backend.service;

import com.example.backend.entity.GiftCardEntity;
import com.example.backend.entity.SeatTypeEntity;
import com.example.backend.exception.MyException;
import com.example.backend.repository.GiftCardRepo;
import com.example.backend.repository.SeatTypeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SeatTypeService {

    @Autowired
    private SeatTypeRepo seatTypeRepo;

    public SeatTypeEntity add(SeatTypeEntity seat_type) throws MyException {
        if (seatTypeRepo.findByType(seat_type.getType()) != null) {
            throw new MyException("Такой тип места уже существует");
        }
        return seatTypeRepo.save(seat_type);
    }

    public Iterable<SeatTypeEntity> getAll() {
        Iterable<SeatTypeEntity> giftSeats = seatTypeRepo.findAll();
        return giftSeats;
    }
}
