package com.example.backend.model;

import com.example.backend.entity.MySeatSelectEntity;

public class MySeatSelect {
    private int i_row;
    private int i_column;
    private int seance_id;

    public MySeatSelect() {
    }

    public static MySeatSelect toModel(MySeatSelectEntity entity) {
        MySeatSelect model = new MySeatSelect();
        model.setI_row(entity.getI_row());
        model.setI_column(entity.getI_column());
        model.setSeance_id(entity.getSeance().getId());
        return model;
    }

    public void setI_row(int i_row) {
        this.i_row = i_row;
    }
    public void setI_column(int i_column) {
        this.i_column = i_column;
    }
    public void setSeance_id(int seance_id) {
        this.seance_id = seance_id;
    }

    public int getI_row() {
        return i_row;
    }
    public int getI_column() {
        return i_column;
    }
    public int getSeance_id() {
        return seance_id;
    }
}
