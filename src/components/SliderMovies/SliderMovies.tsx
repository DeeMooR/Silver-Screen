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
            slidesPerView={4.6}
            slidesPerGroup={3}
            centeredSlides={true}
            loop={true}
            navigation={true}
            breakpoints={{
                1200: {
                    // для разрешения больше 1200px
                    spaceBetween: 50,
                },
                1024: {
                    centeredSlides: true,
                    slidesPerView: 4.6,
                    spaceBetween: 25,
                },
                900: {
                    centeredSlides: false,
                    slidesPerView: 3.6,
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
                <SwiperSlide>
                    <div className="cards__item" key={i}>
                        <MovieCard obj={card} page='main' />
                    </div>
                </SwiperSlide>
                {i === arrMovies.length - 3 && 
                    <SwiperSlide>
                        <div>
                            <NotFind />
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
