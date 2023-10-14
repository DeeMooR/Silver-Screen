import React, { FC } from 'react'
import Button from 'src/components/Button'
import { ISlide } from 'src/interfaces'
import './SlideInfo.css'
import { arrMovies } from 'src/helpers'
import { useNavigate } from 'react-router-dom'

interface ISlideInfo {
    slide: ISlide
}

const SlideInfo:FC<ISlideInfo> = ({slide}) => {
    const navigate = useNavigate();
    let filmTitle, filmGenres;
    const isMain = slide.idFilm || slide.textButton;

    if (typeof slide.idFilm === 'number') {
        filmTitle = arrMovies[slide.idFilm].title;
        filmGenres = arrMovies[slide.idFilm].genres.join(', ') + ', ' + arrMovies[slide.idFilm].age + '+';
    }

    const clickButton = () => {
        if (typeof slide.idFilm === 'number') {
            navigate(`/afisha/${slide.idFilm}`, {state: {fromPage: 'main'}});
        }
    }

    return (
        <div className={`slideInfo slideInfo-${isMain ? 'main' : 'otherPage'}`}>
            <img src={slide.image} className='slideInfo__image' />
            <div className='slideInfo__wrapper'>
                <div className="slideInfo__description">
                    <p className="slideInfo__genres">
                        {filmGenres ? filmGenres : slide.text}
                    </p>
                    <h2 className="slideInfo__title">
                        {filmTitle ? filmTitle : slide.title}
                    </h2>
                    {isMain &&
                        <div className="slideInfo__button">
                            <Button color='red' handleClick={clickButton}>
                                {slide.textButton ? slide.textButton : 'Купить билет'}
                            </Button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SlideInfo
