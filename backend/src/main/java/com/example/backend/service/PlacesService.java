package com.example.backend.service;

import com.example.backend.entity.*;
import com.example.backend.exception.MyException;
import com.example.backend.model.Places;
import com.example.backend.model.User;
import com.example.backend.repository.PlacesRepo;
import com.example.backend.repository.SeanceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class PlacesService {

    @Autowired
    private PlacesRepo placesRepo;
    @Autowired
    private SeanceRepo seanceRepo;

    public Places add(int[] numbers, int seance_id) throws MyException {
        PlacesEntity entity = new PlacesEntity();
        entity.setNumbers(numbers);

        Optional<SeanceEntity> findSeance = seanceRepo.findById(seance_id);
        if (!findSeance.isPresent()) {
            throw new MyException("Ошибка в получение seance");
        }
        entity.setSeance(findSeance.get());
        return Places.toModel(placesRepo.save(entity));
    }

    public Places getOne(int id) throws MyException {
        Optional<PlacesEntity> numbers = placesRepo.findById(id);
        if (!numbers.isPresent()) {
            throw new MyException("Массив не найден");
        }
        return Places.toModel(numbers.get());
    }

    public List<Places> getAll() {
        Iterable<PlacesEntity> numbersEntities = placesRepo.findAll();
        return StreamSupport.stream(numbersEntities.spliterator(), false)
                .map(Places::toModel)
                .collect(Collectors.toList());
    }
}
