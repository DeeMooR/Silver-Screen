package com.example.backend.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "room")
public class RoomEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int cost_single;
    private int cost_sofa;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "room")
    private List<RoomRowEntity> rows;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "room")
    private List<SeanceEntity> seances;

    public RoomEntity() {
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setCost_single(int cost_single) {
        this.cost_single = cost_single;
    }
    public void setCost_sofa(int cost_sofa) {
        this.cost_sofa = cost_sofa;
    }
    public void setRows(List<RoomRowEntity> rows) {
        this.rows = rows;
    }
    public void setSeances(List<SeanceEntity> seances) {
        this.seances = seances;
    }

    public int getId() {
        return id;
    }
    public int getCost_single() {
        return cost_single;
    }
    public int getCost_sofa() {
        return cost_sofa;
    }
    public List<RoomRowEntity> getRows() {
        return rows;
    }
    public List<SeanceEntity> getSeances() {
        return seances;
    }
}
