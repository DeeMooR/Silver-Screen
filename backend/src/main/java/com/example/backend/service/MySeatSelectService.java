package com.example.backend.service;

import com.example.backend.entity.MyMovieEntity;
import com.example.backend.entity.MySeatSelectEntity;
import com.example.backend.entity.SeatTypeEntity;
import com.example.backend.entity.UserEntity;
import com.example.backend.exception.MyException;
import com.example.backend.model.MyMovie;
import com.example.backend.model.MySeatSelect;
import com.example.backend.repository.MySeatSelectRepo;
import com.example.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class MySeatSelectService {

    @Autowired
    private MySeatSelectRepo mySeatSelectRepo;
    @Autowired
    private UserRepo userRepo;

    public MySeatSelect add(MySeatSelectEntity seat, int user_id) throws MyException {
        Optional<UserEntity> findUser = userRepo.findById(user_id);
        if (!findUser.isPresent()) {
            throw new MyException("Ошибка в получение user");
        }
        seat.setUser(findUser.get());
        return MySeatSelect.toModel(mySeatSelectRepo.save(seat));
    }

    public MySeatSelect getOne(int id) throws MyException {
        Optional<MySeatSelectEntity> mySeatSelect = mySeatSelectRepo.findById(id);
        if (!mySeatSelect.isPresent()) {
            throw new MyException("Место не найдено");
        }
        return MySeatSelect.toModel(mySeatSelect.get());
    }

    public List<MySeatSelect> getAll() {
        Iterable<MySeatSelectEntity> mySeatSelectEntities = mySeatSelectRepo.findAll();
        return StreamSupport.stream(mySeatSelectEntities.spliterator(), false)
                .map(MySeatSelect::toModel)
                .collect(Collectors.toList());
    }
}
