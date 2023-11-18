package com.example.backend.model;

import com.example.backend.entity.MyMovieEntity;
import com.example.backend.entity.RoomEntity;
import com.example.backend.entity.RoomRowEntity;
import com.example.backend.entity.SeatTypeEntity;

import java.util.List;
import java.util.stream.Collectors;

public class Room {
    private int id;
    private int cost_single;
    private int cost_sofa;
    private List<RoomRow> rows;

    public Room() {
    }

    public static Room toModel(RoomEntity entity) {
        Room model = new Room();
        model.setId(entity.getId());
        model.setCostSingle(entity.getCost_single());
        model.setCostSofa(entity.getCost_sofa());
        model.setRows(entity.getRows().stream().map(RoomRow::toModel).collect(Collectors.toList()));
        return model;
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setCostSingle(int cost_single) {
        this.cost_single = cost_single;
    }
    public void setCostSofa(int cost_sofa) {
        this.cost_sofa = cost_sofa;
    }
    public void setRows(List<RoomRow> rows) {
        this.rows = rows;
    }

    public int getId() {
        return id;
    }
    public int getCostSingle() {
        return cost_single;
    }
    public int getCostSofa() {
        return cost_sofa;
    }
    public List<RoomRow> getRows() {
        return rows;
    }
}
