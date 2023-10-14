import React, { useEffect } from 'react'
import PageTemplate from 'src/components/PageTemplate'
import HorizontalNews from 'src/components/HorizontalNews';
import SliderSwiper from 'src/components/SliderSwiper';
import SliderMovies from 'src/components/SliderMovies';
import { BackgroundSlider } from './styled';
import './Main.css'

import slider_background from "src/icons/afisha_background.svg"
import { arrAfishaNews, getArrDate, setTodayDateStore } from 'src/helpers';
import { INews } from 'src/interfaces';
import MainText from './MainText';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Main = () => {
    const dispatch = useDispatch();
    dispatch({ type: "CLEAR_SEARCH", payload: getArrDate()[0] });
    window.scrollTo({top: 0});

    return (
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
                {arrAfishaNews.map((item: INews, index: number) => (
                    <div className="news__item" key={index}>
                        {index % 2 === 0
                        ? <HorizontalNews obj={item} />
                        : <HorizontalNews obj={item} reverse />
                        }
                    </div>
                ))}
                <MainText />
            </div>
        </PageTemplate>
    )
}

export default Main
