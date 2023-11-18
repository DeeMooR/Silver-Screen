create table hibernate_sequence (
    next_val bigint
) engine=MyISAM;

insert into hibernate_sequence values ( 1 );
insert into hibernate_sequence values ( 1 );

CREATE TABLE user (
    id int primary key not null,
   	username varchar(64) not null unique,
   	password varchar(64) not null
) engine=MyISAM;

CREATE TABLE my_card (
    id int primary key AUTO_INCREMENT,
    id_card int not null,
    number_card int not null,
    start varchar(64) not null,
    end varchar(64) not null,
    status boolean not null
) engine=MyISAM;

CREATE TABLE my_seat_select (
    id int primary key AUTO_INCREMENT,
    i_row int not null,
    i_column int not null,
    id_seance int not null
) engine=MyISAM;

CREATE TABLE my_movie (
    id int primary key AUTO_INCREMENT,
    id_movie int not null,
    i_row int not null,
    i_column int not null,
    cost int not null,
    id_seance int not null
) engine=MyISAM;

CREATE TABLE gift_card (
    id int primary key not null,
    image string varchar(64) not null,
    cost int not null,
    amount int not null,
) engine=MyISAM;

CREATE TABLE seat_type (
    type string varchar(64) primary key not null,
    image string varchar(64) not null,
    image_select string varchar(64) not null,
    description string varchar(200) not null,
) engine=MyISAM;

CREATE TABLE room (
    id int primary key AUTO_INCREMENT,
    cost_single int not null,
    cost_sofa int not null,
) engine=MyISAM;

CREATE TABLE room_row (
    id int primary key AUTO_INCREMENT,
    seats int not null
) engine=MyISAM;