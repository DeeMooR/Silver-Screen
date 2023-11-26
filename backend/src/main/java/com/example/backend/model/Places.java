package com.example.backend.model;

import com.example.backend.entity.GenreEntity;
import com.example.backend.entity.PlacesEntity;

public class Places {
    private int id;
    private int[] numbers;
    private int seance_id;

    public Places() {
    }

    public static Places toModel(PlacesEntity entity) {
        Places model = new Places();
        model.setId(entity.getId());
        model.setNumbers(entity.getNumbers());
        model.setSeance_id(entity.getSeance().getId());
        return model;
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setNumbers(int[] numbers) {
        this.numbers = numbers;
    }
    public void setSeance_id(int seance_id) {
        this.seance_id = seance_id;
    }

    public int getId() {
        return id;
    }
    public int[] getNumbers() {
        return numbers;
    }
    public int getSeance_id() {
        return seance_id;
    }
}
