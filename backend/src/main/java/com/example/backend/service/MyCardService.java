package com.example.backend.service;

import com.example.backend.entity.MyCardEntity;
import com.example.backend.entity.UserEntity;
import com.example.backend.model.MyCard;
import com.example.backend.repository.MyCardRepo;
import com.example.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MyCardService {

    @Autowired
    private MyCardRepo myCardRepo;
    @Autowired
    private UserRepo userRepo;

    public MyCard add(MyCardEntity card, int userId) {
        UserEntity user = userRepo.findById(userId).get();
        card.setUser(user);
        return MyCard.toModel(myCardRepo.save(card));
    }

    public MyCard changeStatus(int id) {
        MyCardEntity card = myCardRepo.findById(id).get();
        card.setStatus(false);
        return MyCard.toModel(myCardRepo.save(card));
    }
}
