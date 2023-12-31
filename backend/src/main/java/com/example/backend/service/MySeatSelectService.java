package com.example.backend.service;

import com.example.backend.entity.*;
import com.example.backend.exception.MyException;
import com.example.backend.model.MyMovie;
import com.example.backend.model.MySeatSelect;
import com.example.backend.modelShort.MySeatSelectShort;
import com.example.backend.repository.MySeatSelectRepo;
import com.example.backend.repository.SeanceRepo;
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
    @Autowired
    private SeanceRepo seanceRepo;

    public MySeatSelectShort add(MySeatSelectEntity seat, int user_id, int seance_id) throws MyException {
        Optional<UserEntity> findUser = userRepo.findById(user_id);
        if (!findUser.isPresent()) {
            throw new MyException("Ошибка в получение user");
        }
        seat.setUser(findUser.get());

        Optional<SeanceEntity> findSeance = seanceRepo.findById(seance_id);
        if (!findSeance.isPresent()) {
            throw new MyException("Ошибка в получение seance");
        }
        seat.setSeance(findSeance.get());

        return MySeatSelectShort.toModel(mySeatSelectRepo.save(seat));
    }

    public MySeatSelect getOne(int id) throws MyException {
        Optional<MySeatSelectEntity> mySeatSelect = mySeatSelectRepo.findById(id);
        if (!mySeatSelect.isPresent()) {
            throw new MyException("Место не найдено");
        }
        return MySeatSelect.toModel(mySeatSelect.get());
    }

    public List<MySeatSelect> getOneUserOneSeance(int user_id, int seance_id) throws MyException {
        Optional<UserEntity> findUser = userRepo.findById(user_id);
        if (!findUser.isPresent()) {
            throw new MyException("Ошибка в получение user");
        }

        Optional<SeanceEntity> findSeance = seanceRepo.findById(seance_id);
        if (!findSeance.isPresent()) {
            throw new MyException("Ошибка в получение seance");
        }

        Iterable<MySeatSelectEntity> mySeatSelectEntities = mySeatSelectRepo.findAll();
        return StreamSupport.stream(mySeatSelectEntities.spliterator(), false)
                .filter(item -> item.getUser().getId() == user_id)
                .filter(item -> item.getSeance().getId() == seance_id)
                .map(MySeatSelect::toModel)
                .collect(Collectors.toList());
    }

    public void delete(int id) {
        Optional<MySeatSelectEntity> findSeat = mySeatSelectRepo.findById(id);
        if (findSeat.isPresent()) {
            mySeatSelectRepo.delete(findSeat.get());
        }
    }
}
