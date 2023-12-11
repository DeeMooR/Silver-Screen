import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import PageMovieTemplate from 'src/components/PageMovieTemplate';
import Navigation from 'src/components/Navigation';
import Schedule from 'src/components/Schedule';
import Modal from 'src/components/Modal';
import { getArrDate, setDateStore, getArrDates7Days, getArrSoonDatesWithWeek } from 'src/helpers';
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

    // получить объект фильма
    let { id = '' } = useParams<{ id: string }>();
    const movie = arrMovies.find(movie => movie.id == +id);
    const isAlready = movie?.schedule.some((item) => getArrDates7Days().includes(item.date));
    let fullFirstDate: string | undefined;
    
    // получить данные с бд
    useEffect(() => {
        if (id) dispatch({ type: "SET_ID_ACTIVE_MOVIE_PAGE", payload: +id });
        const fetchData = async () => {
            await dispatch({ type: "SET_LOADING_PAGE" });
            if (!arrMovies.length) await dispatch(GET_MOVIES(setModal));
            await dispatch({ type: "SET_LOADING_PAGE" });
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (movie && searchDate) {
            const schedule = movie.schedule.find(item => item.date === searchDate.split(', ')[1]); 
            if (schedule?.seances.length === 0) dispatch(GET_SEANCES_ONE_MOVIE(movie.id, setModal));

        }
    }, [movie, searchDate]);

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
    
    // ссылка для возвращения
    let customBackStr;
    if (location.state && location.state.fromPage === '/buy-ticket') customBackStr = '/afisha';
    else if (!location.state) customBackStr = '/';
    else customBackStr = '';

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
                <Modal movie={movie} isModal={isModal} setIsModal={setIsModal} />
            </PageMovieTemplate>
        )}
        </>
    )
}

export default MoviePage
