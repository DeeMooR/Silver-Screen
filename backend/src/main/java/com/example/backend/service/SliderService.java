package com.example.backend.service;

import com.example.backend.entity.SliderEntity;
import com.example.backend.exception.MyException;
import com.example.backend.model.Slider;
import com.example.backend.repository.SliderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class SliderService {

    @Autowired
    private SliderRepo sliderRepo;

    public Slider add(SliderEntity slider) throws MyException {
        return Slider.toModel(sliderRepo.save(slider));
    }

    public Slider getOne(int id) throws MyException {
        Optional<SliderEntity> slide = sliderRepo.findById(id);
        if (!slide.isPresent()) {
            throw new MyException("Слайд не найден");
        }
        return Slider.toModel(slide.get());
    }

    public List<Slider> getAll() {
        Iterable<SliderEntity> sliderEntities = sliderRepo.findAll();
        return StreamSupport.stream(sliderEntities.spliterator(), false)
                .map(Slider::toModel)
                .collect(Collectors.toList());
    }
}
