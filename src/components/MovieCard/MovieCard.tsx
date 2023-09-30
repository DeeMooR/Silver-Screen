import React, { FC } from 'react'
import { IMovie } from '../../interfaces'
import { StyledImage } from './styled'
import './MovieCard.css'
import Button from '../Button'

import img1 from "../../icons/movies/Барби.jpeg"
import img2 from "../../icons/movies/Неудержимые_4.jpeg"
import img3 from "../../icons/movies/Оппенгеймер.jpeg"
import img4 from "../../icons/movies/После_навсегда.jpeg"
import img5 from "../../icons/movies/Черепашки_Ниндзя.jpeg"
import img6 from "../../icons/movies/Элементарно.jpeg"
import img7 from "../../icons/movies/Монстр_и_маги_синих_морей.jpeg"
import img8 from "../../icons/movies/Искусство_по_понятиям.jpeg"
import img9 from "../../icons/movies/Индиана_Джонс.jpeg"
import img10 from "../../icons/movies/Дозор_джунглей_кругосветка.jpeg"

import img11 from "../../icons/movies/Иван_Семёнов.jpeg"
import img12 from "../../icons/movies/Синий_жук.jpeg"
import img13 from "../../icons/movies/Дети_шпионов.jpeg"
import img14 from "../../icons/movies/Великая_ирония.jpeg"
import img15 from "../../icons/movies/Великий_уравнитель_3.jpeg"
import img16 from "../../icons/movies/Леди_Баг_и_Супер_Кот.jpeg"

interface IMovieCard {
    obj: IMovie,
}

const MovieCard:FC<IMovieCard> = ({obj}) => {
    const arr = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16]
    const value = arr[obj.id - 1];

    return (
        <div className='movieCard'>
            {/* <img src={value} alt={obj.title} /> */}
            <StyledImage image={value}></StyledImage>
            <article className='movieCard__info'>
                <p className='movieCard__age-lang'>{obj.age}+ / {obj.language}</p>
                <h2 className='movieCard__title'>
                    <a href="#">{obj.title}</a>
                </h2>
                <p className='movieCard__genres'>{obj.genres.join(', ')}</p>
                <Button color='red'>Купить билет</Button>
            </article> 
        </div>
    )
}

export default MovieCard
