package com.example.backend.entity;

import com.example.backend.model.Seance;

import javax.persistence.*;

@Entity
@Table(name = "places")
public class PlacesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int[] numbers;

    @ManyToOne
    @JoinColumn(name = "seance_id")
    private SeanceEntity seance;

    public PlacesEntity() {
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setNumbers(int[] numbers) {
        this.numbers = numbers;
    }
    public void setSeance(SeanceEntity seance) {
        this.seance = seance;
    }

    public int getId() {
        return id;
    }
    public int[] getNumbers() {
        return numbers;
    }
    public SeanceEntity getSeance() {
        return seance;
    }
}