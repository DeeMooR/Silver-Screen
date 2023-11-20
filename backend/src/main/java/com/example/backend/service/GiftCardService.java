package com.example.backend.service;

import com.example.backend.entity.GiftCardEntity;
import com.example.backend.entity.UserEntity;
import com.example.backend.exception.MyException;
import com.example.backend.model.GiftCard;
import com.example.backend.model.User;
import com.example.backend.repository.GiftCardRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class GiftCardService {

    @Autowired
    private GiftCardRepo giftCardRepo;

    public GiftCardEntity add(GiftCardEntity card) throws MyException {
        Optional<GiftCardEntity> findCard = giftCardRepo.findById(card.getId());
        if (findCard.isPresent()) {
            throw new MyException("Такая карточка уже существует");
        }
        return giftCardRepo.save(card);
    }

    public GiftCard getOne(int id) throws MyException {
        Optional<GiftCardEntity> card = giftCardRepo.findById(id);
        if (!card.isPresent()) {
            throw new MyException("Карточка не найдена");
        }
        return GiftCard.toModel(card.get());
    }

    public List<GiftCard> getAll() {
        Iterable<GiftCardEntity> giftCardEntities = giftCardRepo.findAll();
        return StreamSupport.stream(giftCardEntities.spliterator(), false)
                .map(GiftCard::toModel)
                .collect(Collectors.toList());
    }
}
