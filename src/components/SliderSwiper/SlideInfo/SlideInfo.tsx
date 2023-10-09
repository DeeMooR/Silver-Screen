import React, { FC } from 'react'
import Button from 'src/components/Button'
import { ISlide } from 'src/interfaces'
import './SlideInfo.css'
import { arrMovies } from 'src/helpers'

interface ISlideInfo {
    slide: ISlide
}

const SlideInfo:FC<ISlideInfo> = ({slide}) => {
    let filmTitle, filmGenres;
    if (typeof slide.idFilm === 'number') {
        filmTitle = arrMovies[slide.idFilm].title;
        filmGenres = arrMovies[slide.idFilm].genres.join(', ') + ', ' + arrMovies[slide.idFilm].age + '+';
    }

    return (
        <>
            <img src={slide.image} className='slideInfo__image' />
            <div className='slideInfo__wrapper'>
                <div className="slideInfo__description">
                    <p className="slideInfo__genres">
                        {filmGenres ? filmGenres : slide.text}
                    </p>
                    <h2 className="slideInfo__title">
                        {filmTitle ? filmTitle : slide.title}
                    </h2>
                    <div className="slideInfo__button">
                        <Button color='red'>
                            {slide.textButton ? slide.textButton : 'Купить билет'}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SlideInfo
