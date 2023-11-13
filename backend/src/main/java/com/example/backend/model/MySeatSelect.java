package com.example.backend.model;

import com.example.backend.entity.MySeatSelectEntity;

public class MySeatSelect {
    private int i_row;
    private int i_column;
    private int id_seance;

    public MySeatSelect() {
    }

    public static MySeatSelect toModel(MySeatSelectEntity entity) {
        MySeatSelect model = new MySeatSelect();
        model.setRow(entity.getRow());
        model.setColumn(entity.getColumn());
        model.setIdSeance(entity.getIdSeance());
        return model;
    }

    public void setRow(int i_row) {
        this.i_row = i_row;
    }
    public void setColumn(int i_column) {
        this.i_column = i_column;
    }
    public void setIdSeance(int id_seance) {
        this.id_seance = id_seance;
    }

    public int getRow() {
        return i_row;
    }
    public int getColumn() {
        return i_column;
    }
    public int getIdSeance() {
        return id_seance;
    }
}
