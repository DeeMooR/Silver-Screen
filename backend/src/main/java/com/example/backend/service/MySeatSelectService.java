package com.example.backend.service;

import com.example.backend.entity.MySeatSelectEntity;
import com.example.backend.entity.UserEntity;
import com.example.backend.model.MySeatSelect;
import com.example.backend.repository.MySeatSelectRepo;
import com.example.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MySeatSelectService {

    @Autowired
    private MySeatSelectRepo mySeatSelectRepo;
    @Autowired
    private UserRepo userRepo;

    public MySeatSelect add(MySeatSelectEntity seat, int userId) {
        UserEntity user = userRepo.findById(userId).get();
        seat.setUser(user);
        return MySeatSelect.toModel(mySeatSelectRepo.save(seat));
    }
}
