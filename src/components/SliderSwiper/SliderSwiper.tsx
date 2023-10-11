import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, A11y } from 'swiper/modules';
import SlideInfo from './SlideInfo';
import { arrSliderSwiper } from 'src/helpers';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './SliderSwiper.css';

const SliderSwiper = () => {
    return (
    <>
        <Swiper 
            speed={800}
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false,
            }}
            modules={[Autoplay, Navigation, Pagination, A11y]}
            className="swiperPosters"
        >
            {arrSliderSwiper.map((item, index) => (
                <SwiperSlide key={index} className='mySlide'>
                    <SlideInfo slide={item} />
                </SwiperSlide>
            ))}
        </Swiper>
    </>
    )
}

export default SliderSwiper
