import React, { FC } from 'react'
import Button from 'src/components/Button'
import { ISlide } from 'src/interfaces'
import './SlideInfo.css'
import { arrMovies } from 'src/helpers'
import { useNavigate } from 'react-router-dom'

interface ISlideInfo {
    slide: ISlide,
    reverse?: boolean
}

const SlideInfo:FC<ISlideInfo> = ({slide, reverse}) => {
    const navigate = useNavigate();
    let filmTitle, filmGenres;
    const isMain = slide.idFilm || slide.textButton;

    if (slide.idFilm || slide.idFilm === 0) {
        filmTitle = arrMovies[slide.idFilm].title;
        filmGenres = arrMovies[slide.idFilm].genres.join(', ') + ', ' + arrMovies[slide.idFilm].age + '+';
    }

    const clickButton = () => {
        if (slide.idFilm) {
            navigate(`/afisha/${slide.idFilm}`, {state: {fromPage: 'main'}});
        } else if (slide.link) {
            navigate(slide.link);
        } else navigate('/page404');
    }

    return (
        <div className={`slideInfo slideInfo-${isMain ? 'main' : 'otherPage'}`}>
            <img src={slide.image} className='slideInfo__image' />
            <div className='slideInfo__wrapper'>
                <div className={`slideInfo__description ${reverse ? 'description-reverse' : ''}`}>
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
