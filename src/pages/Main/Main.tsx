import React, { useEffect, useState } from 'react'
import PageTemplate from 'src/components/PageTemplate'
import HorizontalNews from 'src/components/HorizontalNews';
import SliderSwiper from 'src/components/SliderSwiper';
import SliderMovies from 'src/components/SliderMovies';
import { BackgroundSlider } from './styled';
import './Main.css'

import slider_background from "src/icons/afisha_background.svg"
import { arrMainNews, getArrDate, setTodayDateStore } from 'src/helpers';
import { INews, ISlide } from 'src/interfaces';
import MainText from './MainText';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { GET_SLIDER_SWIPER } from 'src/actions/actions';

const Main = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const arrSliderSwiper: ISlide[] = useSelector(({storePages}) => storePages.sliderSwiper);
    dispatch({ type: "CLEAR_SEARCH", payload: getArrDate()[0] });
    const [modal, setModal] = useState(<div/>);

    useEffect(() => {
        window.scrollTo({top: 0});
        const fetchData = async () => {
            dispatch({ type: "SET_LOADING_PAGE" });
            if (!arrSliderSwiper.length) await dispatch(GET_SLIDER_SWIPER(setModal));
            dispatch({ type: "SET_LOADING_PAGE" });
        };
        fetchData();
    },[])

    return (
        <>
        {modal}
        {arrSliderSwiper && 
            <PageTemplate>
                <div className='main'>
                    <SliderSwiper />
                    <BackgroundSlider image={slider_background} className="main__afisha">
                        <div className="afisha-main__wrapper">
                            <h2 className="afisha-main__title">Афиша</h2>
                            <div className="afisha-main__buttons">
                                <div className="buttons__left">
                                    <a href="#" className='buttons__today active'>Сейчас в кино</a>
                                    <a href="#" className='buttons__soon'>Скоро</a>
                                </div>
                                <Link to='/afisha' className='buttons__afisha'>Расписание сеансов</Link>
                            </div>
                            <hr className="afisha-main__line" />
                        </div>
                        <SliderMovies />
                    </BackgroundSlider>
                    {arrMainNews.map((item: INews, index: number) => (
                        <div className="news__item" key={index}>
                            {index % 2 === 0
                            ? <HorizontalNews obj={item} page='main' />
                            : <HorizontalNews obj={item} page='main' reverse />
                            }
                        </div>
                    ))}
                    <MainText />
                </div>
            </PageTemplate>
        }
        </>
    )
}

export default Main
