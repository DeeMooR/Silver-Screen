package com.example.backend.service;

import com.example.backend.entity.*;
import com.example.backend.exception.MyException;
import com.example.backend.model.MyCard;
import com.example.backend.model.MyMovie;
import com.example.backend.model.User;
import com.example.backend.repository.GiftCardRepo;
import com.example.backend.repository.MyCardRepo;
import com.example.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class MyCardService {

    @Autowired
    private MyCardRepo myCardRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private GiftCardRepo giftCardRepo;

    public MyCard add(MyCardEntity card, int userId) {
        UserEntity user = userRepo.findById(userId).get();
        card.setUser(user);
        return MyCard.toModel(myCardRepo.save(card));
    }

    public MyCard add(MyCardEntity card, int user_id, int gift_card_id) throws MyException {
        Optional<UserEntity> findUser = userRepo.findById(user_id);
        if (!findUser.isPresent()) {
            throw new MyException("Ошибка в получение user");
        }
        card.setUser(findUser.get());

        Optional<GiftCardEntity> findGiftCard = giftCardRepo.findById(gift_card_id);
        if (!findGiftCard.isPresent()) {
            throw new MyException("Ошибка в получение gift_card");
        }
        card.setGift_card(findGiftCard.get());

        return MyCard.toModel(myCardRepo.save(card));
    }


    public MyCard getOne(int id) throws MyException {
        Optional<MyCardEntity> myCard = myCardRepo.findById(id);
        if (!myCard.isPresent()) {
            throw new MyException("Карта не найдена");
        }
        return MyCard.toModel(myCard.get());
    }

    public List<MyCard> getAll() {
        Iterable<MyCardEntity> myCardEntities = myCardRepo.findAll();
        return StreamSupport.stream(myCardEntities.spliterator(), false)
                .map(MyCard::toModel)
                .collect(Collectors.toList());
    }

    public MyCard changeStatus(int id) {
        MyCardEntity card = myCardRepo.findById(id).get();
        card.setStatus(false);
        return MyCard.toModel(myCardRepo.save(card));
    }
}
