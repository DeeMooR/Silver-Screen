import React from 'react'
import PageTemplate from 'src/components/PageTemplate'
import SliderSwiper from 'src/components/SliderSwiper';
import SliderMovies from 'src/components/SliderMovies';
import { BackgroundImage } from './styled';
import './Main.css'

import background from "src/icons/afisha_background.svg"

const Main = () => {
    return (
        <PageTemplate>
            <div className='main'>
                <SliderSwiper />
                <BackgroundImage image={background} className="main__afisha">
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
                </BackgroundImage>
            </div>
        </PageTemplate>
    )
}

export default Main
