import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IMovie } from '../../interfaces'
import { StyledImage } from './styled'
import './MovieCard.css'
import Button from '../Button'

interface IMovieCard {
    obj: IMovie,
}

const MovieCard:FC<IMovieCard> = ({obj}) => {
    const navigate = useNavigate();

    const moveNewPage = () => {
        navigate(`/afisha/${obj.id}`);
    }

    return (
        <div className='movieCard'>
            <StyledImage image={obj.image} onClick={moveNewPage}></StyledImage>
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
