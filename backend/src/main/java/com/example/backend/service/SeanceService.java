package com.example.backend.service;

import com.example.backend.entity.*;
import com.example.backend.exception.MyException;
import com.example.backend.model.Schedule;
import com.example.backend.model.Seance;
import com.example.backend.model.User;
import com.example.backend.repository.MovieRepo;
import com.example.backend.repository.RoomRepo;
import com.example.backend.repository.ScheduleRepo;
import com.example.backend.repository.SeanceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class SeanceService {

    @Autowired
    private SeanceRepo seanceRepo;
    @Autowired
    private ScheduleRepo scheduleRepo;
    @Autowired
    private RoomRepo roomRepo;

    public Seance add(SeanceEntity seance, int schedule_id, int room_id) throws MyException {
        Optional<ScheduleEntity> findSchedule = scheduleRepo.findById(schedule_id);
        if (!findSchedule.isPresent()) {
            throw new MyException("Ошибка в получение schedule");
        }
        seance.setSchedule(findSchedule.get());

        Optional<RoomEntity> findRoom = roomRepo.findById(room_id);
        if (!findRoom.isPresent()) {
            throw new MyException("Ошибка в получение room");
        }
        seance.setRoom(findRoom.get());

        return Seance.toModel(seanceRepo.save(seance));
    }

    public Seance getOne(int id) throws MyException {
        Optional<SeanceEntity> seance = seanceRepo.findById(id);
        if (!seance.isPresent()) {
            throw new MyException("Сеанс не найден");
        }
        return Seance.toModel(seance.get());
    }

    public List<Seance> getAll() {
        Iterable<SeanceEntity> seanceEntities = seanceRepo.findAll();
        return StreamSupport.stream(seanceEntities.spliterator(), false)
                .map(Seance::toModel)
                .collect(Collectors.toList());
    }
}
