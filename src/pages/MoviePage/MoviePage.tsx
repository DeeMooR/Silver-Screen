import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navigation from 'src/components/Navigation';
import { arrMovies } from 'src/helpers';
import { StyledImage, StyledTrailer } from './styled'
import { IMovie } from 'src/interfaces';
import './MoviePage.css'

import left from "src/icons/left.png"
import iconPlay from "src/icons/play.png"

const MoviePage = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const {id} = useParams<{id: string}>();
    let movie: IMovie | undefined;
    if (id) movie = arrMovies[+id];
    const navigate = useNavigate();

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 0) setIsScrolled(true);
        else setIsScrolled(false);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    let videoId, newDuration;
    if (movie)  {
        videoId = movie.trailer.split("v=")[1];
        newDuration = `${Math.floor(movie.duration / 60)} ч ${movie.duration % 60} мин`
    }
    const trailerImage = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    

    return (
        <>
        {movie &&
            <div className='moviePage'>
                <div className={`moviePage__header ${isScrolled ? 'scrollHeader' : ''}`}>
                    <div className="header__wrapper">
                        <img src={left} onClick={() => navigate('/afisha')} alt="left"/>
                        <span>{movie.title}</span>
                    </div>
                </div>
                <div className="moviePage__wrapper">
                    <Navigation />
                    <div className="moviePage__content">
                        <article className="content__article">
                            <section className='content__movie'>
                                <StyledImage image={movie.image}></StyledImage>
                                <article className='content__text'>
                                    <h2 className='content__title'>{movie.title}</h2>
                                    <p className='content__other'>
                                        <span>{movie.genres.join(', ')}</span> /
                                        <span>{movie.age}+</span> /
                                        <span>{newDuration}</span>
                                        </p>
                                </article> 
                            </section>
                        </article>
                        <aside className="content__aside">
                            <StyledTrailer video={trailerImage} play={iconPlay}></StyledTrailer>
                            <div className="content__description">{movie.description}</div>
                        </aside>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default MoviePage
