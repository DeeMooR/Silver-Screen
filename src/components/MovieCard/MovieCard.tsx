import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Button'
import { IMovie } from '../../interfaces'
import { StyledImage } from './styled'
import './MovieCard.css'

interface IMovieCard {
    obj: IMovie,
    page: 'afisha' | 'main'
}

const MovieCard:FC<IMovieCard> = ({obj, page}) => {
    const navigate = useNavigate();
    const [buttonText, setButtonText] = useState(`${window.innerWidth < 900 ? 'Купить' : 'Купить билет'}`);

    // текст изменяется в зависимости от размера окна браузера
    useEffect(() => {
        const updateButtonText = () => {
            if (window.innerWidth < 900) setButtonText('Купить');
            else setButtonText('Купить билет');
        };
        window.addEventListener('resize', updateButtonText);
        return () => window.removeEventListener('resize', updateButtonText);
    }, []);

    // перейти на страницу фильма
    const moveNewPage = () => {
        navigate(`/afisha/${obj.id}`, {state: {fromPage: `/${page}`}});
    }

    return (
        <div className={`movieCard movieCard-${page}`}>
            <StyledImage image={obj.image} className='movieCard__image' onClick={moveNewPage}></StyledImage>
            <article className='movieCard__info'>
                <p className='movieCard__age-lang'>{obj.age}+ / {obj.language}</p>
                <h2 className='movieCard__title' onClick={moveNewPage}>{obj.title}</h2>
                <p className='movieCard__genres'>{obj.genres.join(', ')}</p>
                {page === 'afisha' 
                ? <Button color='red' handleClick={moveNewPage}>Купить билет</Button>
                : <Button color='red' handleClick={moveNewPage}>{buttonText}</Button>
                }
            </article> 
        </div>
    )
}

export default MovieCard
