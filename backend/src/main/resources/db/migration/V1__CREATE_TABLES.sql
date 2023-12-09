create table hibernate_sequence (
    next_val bigint
) engine=MyISAM;

insert into hibernate_sequence values ( 1 );
insert into hibernate_sequence values ( 1 );

CREATE TABLE user (
    id int primary key not null
) engine=MyISAM;

CREATE TABLE my_card (
    id int primary key AUTO_INCREMENT,
    number_card int not null,
    start varchar(10) not null,
    end varchar(10) not null,
    status boolean not null
) engine=MyISAM;

CREATE TABLE my_seat_select (
    id int primary key AUTO_INCREMENT,
    i_row int not null,
    i_column int not null,
    seat_type varchar(20) not null
) engine=MyISAM;

CREATE TABLE my_movie (
    id int primary key AUTO_INCREMENT,
    date varchar(10) not null,
    i_row int not null,
    i_column int not null
) engine=MyISAM;

CREATE TABLE card (
    id int primary key AUTO_INCREMENT,
    image varchar(64) not null,
    cost int not null,
    amount int not null,
) engine=MyISAM;

CREATE TABLE seat_type (
    type varchar(20) primary key not null,
    image varchar(64) not null,
    image_select varchar(64) not null,
    description varchar(200) not null,
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

CREATE TABLE movie (
    id int primary key AUTO_INCREMENT,
    image varchar(64) not null,
    title varchar(64) not null,
    age int not null,
    language varchar(5) not null,
    genres tinyblob not null,
    sub boolean default false,
    video varchar(4) not null,
    duration int not null,
    description varchar(500) not null,
    trailer varchar(64) not null
) engine=MyISAM;

CREATE TABLE genre (
    id int primary key AUTO_INCREMENT,
    name varchar(64) not null
) engine=MyISAM;

CREATE TABLE schedule (
    id int primary key AUTO_INCREMENT,
    date varchar(10) not null
) engine=MyISAM;

CREATE TABLE seance (
    id int primary key AUTO_INCREMENT,
    time varchar(5) not null
) engine=MyISAM;

CREATE TABLE places (
    id int primary key AUTO_INCREMENT,
    numbers tinyblob not null
) engine=MyISAM;

CREATE TABLE slider (
    id int primary key AUTO_INCREMENT,
    image varchar(64) not null,
    movie_id int,
    title varchar(64),
    text varchar(64),
    text_button varchar(64),
    link varchar(64)
) engine=MyISAM;

CREATE TABLE page_title (
    page varchar(20) primary key not null,
    image varchar(64) not null,
    title varchar(64) not null,
    text varchar(64) not null
) engine=MyISAM;

CREATE TABLE page_news (
    id int primary key AUTO_INCREMENT,
    page varchar(20) not null,
    image varchar(64) not null,
    background_image varchar(64),
    title varchar(64) not null,
    description varchar(400) not null,
    date varchar(10),
    link varchar(64)
) engine=MyISAM;