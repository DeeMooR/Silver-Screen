import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Link } from 'react-router-dom';
import { AnyAction } from 'redux';
import PageTemplate from 'src/components/PageTemplate'
import HorizontalNews from 'src/components/HorizontalNews';
import SliderSwiper from 'src/components/SliderSwiper';
import SliderMovies from 'src/components/SliderMovies';
import MainText from './MainText';
import { getArrDate } from 'src/helpers/helper';
import { GET_MOVIES, GET_NEWS, GET_SLIDER } from 'src/actions/actions';
import { IMovie, INews, ISlide } from 'src/interfaces';
import { BackgroundSlider } from './styled';
import './Main.css'

import slider_background from "src/icons/afisha_background.svg"

const Main = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const arrMovies: IMovie[] = useSelector(({storePages}) => storePages.movies);
    const arrNews: INews[] = useSelector(({storePages}) => storePages.news);
    const arrSliderSwiper: ISlide[] = useSelector(({storePages}) => storePages.slider);
    const movieTypeSelect: string = useSelector(({store}) => store.movieTypeSelect);
    const isLoading = useSelector(({store}) => store.isLoading);
    const isLoadingPage = useSelector(({store}) => store.isLoadingPage);

    const [modal, setModal] = useState(<div/>);
    const pageNews = arrNews.filter((item: INews) => item.page === "main");

    // очистить фильтры, получить данные с бд
    useEffect(() => {
        window.scrollTo({top: 0});
        dispatch({ type: "CLEAR_SEARCH", payload: getArrDate()[0] });
        dispatch({ type: "SET_MOVIE_TYPE_SELECT", payload: "already" });
        
        const fetchData = async () => {
            await dispatch({ type: "SET_LOADING_PAGE" });
            if (!arrMovies.length) await dispatch(GET_MOVIES(setModal));
            if (!arrSliderSwiper.length) await dispatch(GET_SLIDER(setModal));
            await dispatch({ type: "SET_LOADING_PAGE" });
            await dispatch({ type: "SET_LOADING" });
            if (!arrNews.length) await dispatch(GET_NEWS(setModal));
            await dispatch({ type: "SET_LOADING" });
        };
        fetchData();
    },[])

    return (
        <>
        {modal}
        {isLoadingPage ? (
            <div className="loaderPage">
                <div className="loaderPage__element"></div>
            </div>
        ) : (
            <PageTemplate>
                <div className='main'>
                    <SliderSwiper />
                    <BackgroundSlider image={slider_background} className="main__afisha">
                        <div className="afisha-main__wrapper">
                            <h2 className="afisha-main__title">Афиша</h2>
                            <div className="afisha-main__buttons">
                                <div className="buttons__left">
                                    <a 
                                        className={`buttons__today ${movieTypeSelect === 'already' ? 'active' : ''}`} 
                                        onClick={() => dispatch({ type: "SET_MOVIE_TYPE_SELECT", payload: 'already' })}
                                    >Сейчас в кино</a>
                                    <a 
                                        className={`buttons__soon ${movieTypeSelect === 'soon' ? 'active' : ''}`} 
                                        onClick={() => dispatch({ type: "SET_MOVIE_TYPE_SELECT", payload: 'soon' })}
                                    >Скоро</a>
                                </div>
                                <Link to='/afisha' className='buttons__afisha'>Расписание сеансов</Link>
                            </div>
                            <hr className="afisha-main__line" />
                        </div>
                        <SliderMovies />
                    </BackgroundSlider>
                    {isLoading ? (
                        <div className="loader">
                            <div className="loader__element"></div>
                        </div>
                    ) : (
                        <>
                        {pageNews.map((item: INews, index: number) => (
                            <div className="news__item" key={index}>
                                {index % 2 === 0
                                ? <HorizontalNews obj={item} page='main' />
                                : <HorizontalNews obj={item} page='main' reverse />
                                }
                            </div>
                        ))}
                        </>
                    )}
                    <MainText />
                </div>
            </PageTemplate>
        )}
        </>
    )
}

export default Main
