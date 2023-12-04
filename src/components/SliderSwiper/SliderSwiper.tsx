import React from 'react';
import { useSelector } from 'react-redux';
import { Autoplay, Pagination, Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SlideInfo from '../SlideInfo';
import { ISlide } from 'src/interfaces';
import './SliderSwiper.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SliderSwiper = () => {
    const arrSliderSwiper: ISlide[] = useSelector(({storePages}) => storePages.slider);
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
                <SwiperSlide key={index} >
                    <SlideInfo slide={item} />
                </SwiperSlide>
            ))}
        </Swiper>
    </>
    )
}

export default SliderSwiper
