create table hibernate_sequence (
    next_val bigint
);

insert into hibernate_sequence values ( 1 );

CREATE TABLE user (
    id int primary key not null
);

CREATE TABLE my_card (
    id int primary key AUTO_INCREMENT,
    number_card int not null,
    start varchar(10) not null,
    end varchar(10) not null,
    status boolean not null
);

CREATE TABLE my_seat_select (
    id int primary key AUTO_INCREMENT,
    i_row int not null,
    i_column int not null,
    seat_type varchar(20) not null
);

CREATE TABLE my_movie (
    id int primary key AUTO_INCREMENT,
    date varchar(10) not null,
    i_row int not null,
    i_column int not null
);

CREATE TABLE card (
    id int primary key AUTO_INCREMENT,
    image varchar(100) not null,
    cost int not null,
    amount int not null
);

CREATE TABLE seat_type (
    type varchar(20) primary key not null,
    image varchar(100) not null,
    image_select varchar(100) not null,
    description varchar(200) not null
);

CREATE TABLE room (
    id int primary key AUTO_INCREMENT,
    cost_single int not null,
    cost_sofa int not null
);

CREATE TABLE room_row (
    id int primary key AUTO_INCREMENT,
    seats int not null
);

CREATE TABLE movie (
    id int primary key AUTO_INCREMENT,
    image varchar(100) not null,
    title varchar(64) not null,
    age int not null,
    language varchar(5) not null,
    sub boolean default false,
    video varchar(4) not null,
    duration int not null,
    description varchar(500) not null,
    trailer varchar(100) not null
);

CREATE TABLE genre (
    id int primary key AUTO_INCREMENT,
    name varchar(64) not null
);

CREATE TABLE schedule (
    id int primary key AUTO_INCREMENT,
    date varchar(10) not null
);

CREATE TABLE seance (
    id int primary key AUTO_INCREMENT,
    time varchar(5) not null
);

CREATE TABLE places (
    id int primary key AUTO_INCREMENT,
    numbers TINYBLOB not null
);

CREATE TABLE slider (
    id int primary key AUTO_INCREMENT,
    image varchar(100) not null,
    movie_id int,
    title varchar(100),
    text varchar(200),
    text_button varchar(64),
    link varchar(100)
);

CREATE TABLE page_title (
    page varchar(20) primary key not null,
    image varchar(100) not null,
    title varchar(64) not null,
    text varchar(400) not null
);

CREATE TABLE page_news (
    id int primary key AUTO_INCREMENT,
    page varchar(20) not null,
    image varchar(100) not null,
    background_image varchar(100),
    title varchar(100) not null,
    description varchar(400) not null,
    date varchar(32),
    link varchar(100)
);