import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import MovieCard from '../MovieCard';
import { arrMovies } from 'src/helpers';
import { IMovie } from 'src/interfaces';

import 'swiper/css';
import 'swiper/css/navigation';
import './SliderMovies.css';
import NotFind from '../NotFind';

const SliderMovies = () => {
    return (
    <>
        <Swiper
            speed={1000}
            slidesPerGroup={3}
            loop={true}
            navigation={true}
            breakpoints={{
                2000: {
                    // для разрешения больше 2000px
                    centeredSlides: true,
                    slidesPerView: 6.5,
                    spaceBetween: 50,
                },
                1600: {
                    centeredSlides: true,
                    slidesPerView: 5.8,
                    spaceBetween: 50,
                },
                1400: {
                    centeredSlides: true,
                    slidesPerView: 5.4,
                    spaceBetween: 50,
                },
                1200: {
                    centeredSlides: true,
                    slidesPerView: 5,
                    spaceBetween: 50,
                },
                1024: {
                    centeredSlides: true,
                    slidesPerView: 4.6,
                    spaceBetween: 25,
                },
                900: {
                    centeredSlides: false,
                    slidesPerView: 3.7,
                    spaceBetween: 20,
                },
                720: {
                    centeredSlides: false,
                    slidesPerView: 3.5,
                    spaceBetween: 20,
                },
                600: {
                    centeredSlides: false,
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                540: {
                    centeredSlides: false,
                    slidesPerView: 2.75,
                    slidesPerGroup: 3,
                    spaceBetween: 10,
                },
                0: {
                    centeredSlides: false,
                    slidesPerView: 'auto',
                    slidesPerGroup: 1,
                    spaceBetween: 10,
                },
            }}
            modules={[Autoplay, Navigation]}
            className="swiperMovies"
        >
            {arrMovies.map((card: IMovie, i: number) => (
                <>
                <SwiperSlide key={i}>
                    <div className="slide__item">
                        <MovieCard obj={card} page='main' />
                    </div>
                </SwiperSlide>
                {i === arrMovies.length - 4 && 
                    <SwiperSlide className='slide__not-find'>
                        <div>
                            <NotFind page='main' />
                        </div>
                    </SwiperSlide>
                }
                </>
            ))} 
        </Swiper>
    </>
    )
}

export default SliderMovies
