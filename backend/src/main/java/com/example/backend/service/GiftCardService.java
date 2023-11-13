package com.example.backend.service;

import com.example.backend.entity.GiftCardEntity;
import com.example.backend.exception.MyException;
import com.example.backend.repository.GiftCardRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

    public GiftCardEntity getOne(int id) throws MyException {
        Optional<GiftCardEntity> card = giftCardRepo.findById(id);
        if (!card.isPresent()) {
            throw new MyException("Карточка не найдена");
        }
        return card.get();
    }
}
