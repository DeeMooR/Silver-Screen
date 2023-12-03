package com.example.backend.modelShort;

import com.example.backend.entity.MySeatSelectEntity;

public class MySeatSelectShort {
    private int id;
    private int i_row;
    private int i_column;
    private String seat_type;
    private int seance_id;

    public MySeatSelectShort() {
    }

    public static MySeatSelectShort toModel(MySeatSelectEntity entity) {
        MySeatSelectShort model = new MySeatSelectShort();
        model.setId(entity.getId());
        model.setI_row(entity.getI_row());
        model.setI_column(entity.getI_column());
        model.setSeat_type(entity.getSeat_type());
        model.setSeance_id(entity.getSeance().getId());
        return model;
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setI_row(int i_row) {
        this.i_row = i_row;
    }
    public void setI_column(int i_column) {
        this.i_column = i_column;
    }
    public void setSeat_type(String seat_type) {
        this.seat_type = seat_type;
    }
    public void setSeance_id(int seance_id) {
        this.seance_id = seance_id;
    }

    public int getId() {
        return id;
    }
    public int getI_row() {
        return i_row;
    }
    public int getI_column() {
        return i_column;
    }
    public String getSeat_type() {
        return seat_type;
    }
    public int getSeance_id() {
        return seance_id;
    }
}
