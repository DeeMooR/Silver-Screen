import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import PageMovieTemplate from 'src/components/PageMovieTemplate';
import Navigation from 'src/components/Navigation';
import Schedule from 'src/components/Schedule';
import Modal from 'src/components/Modal';
import { getArrDate, setDateStore, getArrDates7Days, getArrSoonDatesWithWeek } from 'src/helpers/helper';
import { GET_MOVIES, GET_SEANCES_ONE_MOVIE } from 'src/actions/actions';
import { IMovie } from 'src/interfaces';
import { StyledTrailer } from './styled'
import './MoviePage.css'

import iconPlay from "src/icons/play.png"

const MoviePage = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const location = useLocation();
    
    const arrMovies: IMovie[] = useSelector(({storePages}) => storePages.movies);
    const searchDate = useSelector(({store}) => store.search.date);
    const isLoadingPage = useSelector(({store}) => store.isLoadingPage);

    const [modal, setModal] = useState(<div/>);
    const [isModal, setIsModal] = useState(false);
    const [customBackStr, setCustomBackStr] = useState('');

    // получить объект фильма
    let { id = '' } = useParams<{ id: string }>();
    const movie = arrMovies.find(movie => movie.id == +id);
    const isAlready = movie?.schedule.some((item) => getArrDates7Days().includes(item.date));
    let fullFirstDate: string | undefined;
    
    // получить данные с бд
    useEffect(() => {
        const fetchData = async () => {
            await dispatch({ type: "SET_LOADING_PAGE" });
            if (!arrMovies.length) await dispatch(GET_MOVIES(setModal));
            await dispatch({ type: "SET_LOADING_PAGE" });
        };
        fetchData();

        // ссылка для иконки 'Назад'
        if (location.state && location.state.fromPage === '/buy-ticket') setCustomBackStr('/afisha');
        else if (!location.state) setCustomBackStr('/');
        else setCustomBackStr('');
    }, []);

    // получить сеансы с бд
    useEffect(() => {
        if (movie && searchDate) {
            const schedule = movie.schedule.find(item => item.date === searchDate.split(', ')[1]); 
            if (schedule?.seances.length === 0) dispatch(GET_SEANCES_ONE_MOVIE(movie.id, setModal));
        }
    }, [movie, searchDate]);

    // установить даты в зависимости от 'Сейчас' или 'Скоро в кино'
    useEffect(() => {
        if (movie) {
            if (isAlready) {
                dispatch({ type: "SET_MOVIE_TYPE_SELECT", payload: 'already' });
                if (searchDate === getArrSoonDatesWithWeek()[0]) {
                    fullFirstDate = getArrDate().find(item => {
                        if (movie.schedule[0].date === item.split(', ')[1]) return true;
                        return false;
                    });
                }
            } else {
                dispatch({ type: "SET_MOVIE_TYPE_SELECT", payload: 'soon' });
                if (searchDate === getArrDate()[0]) {
                    fullFirstDate = getArrSoonDatesWithWeek().find(item => {
                        if (movie.schedule[0].date === item.split(', ')[1]) return true;
                        return false;
                    });
                }
            }
            if (fullFirstDate) setDateStore(fullFirstDate, dispatch);
        }
    }, [isAlready]);

    // ссылка для видео, длительность фильма
    let videoId, newDuration;
    if (movie) {
        videoId = movie.trailer.split("v=")[1];
        newDuration = `${Math.floor(movie.duration / 60)} ч ${movie.duration % 60} мин`;
    }
    const trailerImage = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
        <>
        {modal}
        {(isLoadingPage || !movie) ? (
            <div className="loaderPage">
                <div className="loaderPage__element"></div>
            </div>
        ) : (
            <PageMovieTemplate movie={movie} customBack={customBackStr}>
                <div className='moviePage'>
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
                <Modal movie={movie} isModal={isModal} setIsModal={setIsModal} setCustomBack={setCustomBackStr} />
            </PageMovieTemplate>
        )}
        </>
    )
}

export default MoviePage
