package com.example.backend.service;

import com.example.backend.entity.*;
import com.example.backend.exception.MyException;
import com.example.backend.model.MyCard;
import com.example.backend.model.Places;
import com.example.backend.repository.CardRepo;
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
    private CardRepo cardRepo;

    public MyCard add(MyCardEntity card, int user_id, int card_id) throws MyException {
        Optional<UserEntity> findUser = userRepo.findById(user_id);
        if (!findUser.isPresent()) {
            throw new MyException("Ошибка в получение user");
        }
        card.setUser(findUser.get());

        Optional<CardEntity> findCard = cardRepo.findById(card_id);
        if (!findCard.isPresent()) {
            throw new MyException("Ошибка в получение card");
        }
        card.setCard(findCard.get());

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

    public MyCard changeStatus(int user_id, int number_card) throws MyException {
        Iterable<MyCardEntity> allCards = myCardRepo.findAll();

        MyCardEntity card = StreamSupport.stream(allCards.spliterator(), false)
                .filter(item -> item.getNumber_card() == number_card)
                .findFirst().orElse(null);

        if (card == null) throw new MyException("Карточка не найдена");
        if (card.getUser().getId() != user_id) throw new MyException("user введён неверно");
        if (!card.isStatus()) throw new MyException("Карта не активна");

        card.setStatus(false);
        return MyCard.toModel(myCardRepo.save(card));
    }
}
