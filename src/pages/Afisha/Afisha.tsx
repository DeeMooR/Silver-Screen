import React from 'react'
import PageTemplate from '../../components/PageTemplate'
import MovieCard from '../../components/MovieCard'
import NotFind from 'src/components/NotFind'
import Navigation from 'src/components/Navigation'
import { IMovie } from '../../interfaces'
import './Afisha.css'

const Afisha = () => {
    const movieCards: IMovie[] = [
        {id: 1, image: '', title: 'Барби', age: 12, language: 'RU', genres: ['комедия', 'фэнтези', 'приключения']},
        {id: 2, image: '', title: 'Неудержимые 4', age: 18, language: 'RU', genres: ['комедия', 'экшн', 'боевик']},
        {id: 3, image: '', title: 'Оппенгеймер', age: 16, language: 'RU', genres: ['история', 'биография', 'драма']},
        {id: 4, image: '', title: 'После. Навсегда', age: 16, language: 'RU', genres: ['мелодрама']},
        {id: 5, image: '', title: 'Черепашки-ниндзя: Погром мутантов', age: 12, language: 'RU', genres: ['мультфильм', 'боевик', 'фантастика']},
        {id: 6, image: '', title: 'Элементарно', age: 6, language: 'RU', genres: ['комедия', 'мультфильм', 'приключения']},
        {id: 7, image: '', title: 'Монстр и маги синих морей', age: 6, language: 'RU', genres: ['комедия', 'мультфильм', 'приключения']},
        {id: 8, image: '', title: 'Искусство по понятиям', age: 18, language: 'RU', genres: ['триллер']},
        {id: 9, image: '', title: 'Индиана Джонс и колесо судьбы', age: 12, language: 'RU', genres: ['боевик', 'приключения']},
        {id: 10, image: '', title: 'Дозор джунглей: Кругосветка', age: 6, language: 'RU', genres: ['комедия', 'мультфильм', 'приключения']},
    ]

    return (
        <PageTemplate>
            <div className='afisha'>
                <div className='afisha__header'>
                    <h1>Афиша кино</h1>
                    <div>
                        <a href="#" className='today active'>Сейчас в кино</a>
                        <a href="#" className='soon'>Скоро</a>
                    </div>
                </div>
                <div className='afisha__navigation'>
                    <Navigation />
                </div>
                <div className='afisha__cards'>
                    {movieCards.map((card: IMovie, i: number) => (
                        <div className="cards__item" key={i}>
                            <MovieCard obj={card} />
                        </div>
                    ))}
                    <div className={`cards__item 
                        ${movieCards.length % 4 === 0 && "center-4"}
                        ${movieCards.length % 3 === 0 && "center-3"}
                        ${movieCards.length % 2 === 0 && "center-2"}
                    `}>
                        <NotFind />
                    </div>
                </div>
            </div>
        </PageTemplate>
    );
}

export default Afisha
