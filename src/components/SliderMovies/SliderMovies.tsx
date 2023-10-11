import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import MovieCard from '../MovieCard';
import { arrMovies } from 'src/helpers';
import { IMovie } from 'src/interfaces';

import 'swiper/css';
import 'swiper/css/navigation';
import './SliderMovies.css';

const SliderMovies = () => {
    return (
    <>
        <Swiper
            speed={1000}
            slidesPerView={4}
            spaceBetween={70}
            slidesPerGroup={4}
            loop={true}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className="swiperMovies"
        >
            {arrMovies.map((card: IMovie, i: number) => (
                <SwiperSlide>
                    <div className="cards__item" key={i}>
                        <MovieCard obj={card} />
                    </div>
                </SwiperSlide>
                
            ))}
            {/* <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide> */}
        </Swiper>
    </>
    )
}

export default SliderMovies
