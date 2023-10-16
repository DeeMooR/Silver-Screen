import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from 'src/components/Navigation';
import Schedule from 'src/components/Schedule';
import Modal from 'src/components/Modal';
import { arrMovies, getArrDate, setTodayDateStore } from 'src/helpers';
import { StyledTrailer, BackgroundImage } from './styled'
import { IMovie } from 'src/interfaces';
import './MoviePage.css'

import left from "src/icons/left.svg"
import iconPlay from "src/icons/play.png"

const MoviePage = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const {id} = useParams<{id: string}>();
    let movie: IMovie | undefined;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    if (id) movie = arrMovies[+id];

    const location = useLocation();
    let fullFirstDate;
    if (location.state.fromPage === 'main') {
        fullFirstDate = getArrDate().find(item => {
            if (movie && movie.schedule[0].date === item.split(', ')[1]) return true;
            return false;
        });
    }
    if (fullFirstDate) setTodayDateStore(fullFirstDate, dispatch);

    useEffect(() => {
        if (id) dispatch({ type: "SET_ID_ACTIVE_MOVIE_PAGE", payload: id });

        const handleScroll = () => {
            const scrollBlock = scrollRef.current;
            if (scrollBlock) {
                if (scrollBlock.scrollTop > 0) {
                    setIsScrolled(true);
                } else {
                    setIsScrolled(false);
                }
            }
          };
        const scrollBlock = scrollRef.current;
        if (scrollBlock) scrollBlock.addEventListener('scroll', handleScroll);
        return () => {
            if (scrollBlock) scrollBlock.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    let videoId, newDuration;
    if (movie)  {
        videoId = movie.trailer.split("v=")[1];
        newDuration = `${Math.floor(movie.duration / 60)} ч ${movie.duration % 60} мин`;
    }
    const trailerImage = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;


    return (
        <>
        {movie &&
        <>
        <BackgroundImage image={movie.image}></BackgroundImage>
            <div className='moviePage'>
                <div className={`moviePage__header ${isScrolled ? 'scrollHeader' : ''}`}>
                    <div className="header__wrapper">
                        <img src={left} onClick={() => navigate(-1)} alt="left"/>
                        <span>{movie.title}</span>
                    </div>
                </div>
                <div className="moviePage__scroll" ref={scrollRef}>
                    <div className='moviePage__wrapper'>
                        <Navigation />
                        <div className="moviePage__content">
                            <article className="content__article">
                                <section className='content__movie'>
                                    <img src={movie.image} className='content__image' alt="poster" />
                                    <article className='content__text'>
                                        <h3>{movie.title}</h3>
                                        <p className='content__other'>
                                            <span>{movie.genres.join(', ')}</span> /
                                            <span>{movie.age}+</span> /
                                            <span>{newDuration}</span>
                                            </p>
                                    </article> 
                                </section>
                                <section className='content__schedule'>
                                    <Schedule movie={movie} />
                                </section>
                            </article>
                            <aside className="content__aside">
                                <StyledTrailer video={trailerImage} play={iconPlay} onClick={() => setIsModal(true)}></StyledTrailer>
                                <div className="content__description">{movie.description}</div>
                            </aside>
                        </div>
                    </div>
                </div>
                <Modal movie={movie} isModal={isModal} setIsModal={setIsModal} />
            </div>
            </>
        }
        </>
    )
}

export default MoviePage
