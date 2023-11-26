package com.example.backend.model;

import com.example.backend.entity.MyMovieEntity;
import com.example.backend.entity.RoomEntity;
import com.example.backend.entity.RoomRowEntity;
import com.example.backend.entity.SeatTypeEntity;
import com.example.backend.modelShort.RoomRowShort;

import java.util.List;
import java.util.stream.Collectors;

public class Room {
    private int id;
    private int cost_single;
    private int cost_sofa;
    private List<RoomRowShort> rows;

    public Room() {
    }

    public static Room toModel(RoomEntity entity) {
        Room model = new Room();
        model.setId(entity.getId());
        model.setCost_single(entity.getCost_single());
        model.setCost_sofa(entity.getCost_sofa());
        model.setRows(entity.getRows().stream().map(RoomRowShort::toModel).collect(Collectors.toList()));
        return model;
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
    public void setRows(List<RoomRowShort> rows) {
        this.rows = rows;
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
    public List<RoomRowShort> getRows() {
        return rows;
    }
}
