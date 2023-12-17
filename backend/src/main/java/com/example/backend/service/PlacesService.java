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

    public Places change(int set_number, int seance_id, int index_row, int index_column) throws MyException {
        Iterable<PlacesEntity> places = placesRepo.findAll();

        List<PlacesEntity> filterPlaces = StreamSupport.stream(places.spliterator(), false)
                .filter(item -> item.getSeance().getId() == seance_id)
                .collect(Collectors.toList());

        int[] new_numbers = filterPlaces.get(index_row).getNumbers();
        new_numbers[index_column] = set_number;
        filterPlaces.get(index_row).setNumbers(new_numbers);
        PlacesEntity updatedPlace = placesRepo.save(filterPlaces.get(index_row));
        return Places.toModel(updatedPlace);
    }
}
