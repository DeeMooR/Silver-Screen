import React from 'react'
import PageTemplate from 'src/components/PageTemplate'
import MovieCard from 'src/components/MovieCard'
import NotFind from 'src/components/NotFind'
import Navigation from 'src/components/Navigation'
import { IMovie } from 'src/interfaces'
import { arrMovies } from 'src/helpers';
import './Afisha.css'

const Afisha = () => {
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
                    {arrMovies.map((card: IMovie, i: number) => (
                        <div className="cards__item" key={i}>
                            <MovieCard obj={card} />
                        </div>
                    ))}
                    <div className={`cards__item 
                        ${arrMovies.length % 4 === 0 && "center-4"}
                        ${arrMovies.length % 3 === 0 && "center-3"}
                        ${arrMovies.length % 2 === 0 && "center-2"}
                    `}>
                        <NotFind />
                    </div>
                </div>
            </div>
        </PageTemplate>
    );
}

export default Afisha
