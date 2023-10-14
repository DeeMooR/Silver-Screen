import React from 'react'
import PageTemplate from 'src/components/PageTemplate'
import SlideInfo from 'src/components/SlideInfo'
import { SwiperSlide } from 'swiper/react'
import { INews } from 'src/interfaces'

import title_image from "src/icons/entertainment/entertainment_main.png"

import './Entertainment.css'
import 'src/components/SliderSwiper/SliderSwiper.css'

const Entertainment = () => {
    const titleBlock = {
        id: 1,
        image: title_image,
        title: 'Развлечения',
        text: 'Смотрите концерты, пойте в караоке, отмечайте семейные праздники или играйте в видеоигры на большом экране'
    }

    return (
        <PageTemplate>
            <div className='entertainment'>
                <div className="entertainment__main">
                    <SlideInfo slide={titleBlock} />
                </div>
            </div>
        </PageTemplate>
    )
}

export default Entertainment
