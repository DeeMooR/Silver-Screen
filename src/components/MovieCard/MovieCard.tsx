import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IMovie } from '../../interfaces'
import { StyledImage } from './styled'
import './MovieCard.css'
import Button from '../Button'
import { useDispatch } from 'react-redux'

interface IMovieCard {
    obj: IMovie,
    page: 'afisha' | 'main'
}

const MovieCard:FC<IMovieCard> = ({obj, page}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const moveNewPage = () => {
        dispatch({ type: "SET_SCROLL_AFISHA", payload: window.scrollY });
        navigate(`/afisha/${obj.id}`);
    }

    

    return (
        <div className={`movieCard movieCard-${page}`}>
            <StyledImage image={obj.image} className='movieCard__image' onClick={moveNewPage}></StyledImage>
            <article className='movieCard__info'>
                <p className='movieCard__age-lang'>{obj.age}+ / {obj.language}</p>
                <h2 className='movieCard__title' onClick={moveNewPage}>{obj.title}</h2>
                <p className='movieCard__genres'>{obj.genres.join(', ')}</p>
                <Button color='red' handleClick={moveNewPage}>Купить билет</Button>
            </article> 
        </div>
    )
}

export default MovieCard
