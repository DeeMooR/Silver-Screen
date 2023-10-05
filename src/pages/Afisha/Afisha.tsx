import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageTemplate from 'src/components/PageTemplate'
import MovieCard from 'src/components/MovieCard'
import NotFind from 'src/components/NotFind'
import Navigation from 'src/components/Navigation'
import { IMovie } from 'src/interfaces'
import { arrMovies, getArrDate } from 'src/helpers';
import './Afisha.css'

const Afisha = () => {
    const searchDate = useSelector(({ search }) => search.date);
    const dispatch = useDispatch();
    const arrDate = getArrDate();

    console.log('Afisha')
    if (searchDate === '') {
        dispatch({ 
            type: "SET_SEARCH", 
            payload: {
                type: 'date',
                data: arrDate[0]
            }
        });
    }
    dispatch({ type: "SET_ID_ACTIVE_MOVIE_PAGE", payload: '' });
    
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
