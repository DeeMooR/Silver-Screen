package com.example.backend.service;

import com.example.backend.entity.CardEntity;
import com.example.backend.exception.MyException;
import com.example.backend.model.Card;
import com.example.backend.repository.CardRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class CardService {

    @Autowired
    private CardRepo cardRepo;

    public Card add(CardEntity card) throws MyException {
        return Card.toModel(cardRepo.save(card));
    }

    public Card getOne(int id) throws MyException {
        Optional<CardEntity> card = cardRepo.findById(id);
        if (!card.isPresent()) {
            throw new MyException("Карточка не найдена");
        }
        return Card.toModel(card.get());
    }

    public List<Card> getAll() {
        Iterable<CardEntity> cardEntities = cardRepo.findAll();
        return StreamSupport.stream(cardEntities.spliterator(), false)
                .map(Card::toModel)
                .collect(Collectors.toList());
    }
}
