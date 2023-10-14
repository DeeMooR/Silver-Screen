import React from 'react'
import PageTemplate from 'src/components/PageTemplate'
import HorizontalNews from 'src/components/HorizontalNews';
import SliderSwiper from 'src/components/SliderSwiper';
import SliderMovies from 'src/components/SliderMovies';
import { BackgroundSlider } from './styled';
import './Main.css'

import slider_background from "src/icons/afisha_background.svg"
import { arrAfishaNews } from 'src/helpers';
import { INews } from 'src/interfaces';
import MainText from './MainText';

const Main = () => {

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
                            <a href="#" className='buttons__afisha'>Расписание сеансов</a>
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
