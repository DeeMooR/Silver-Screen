import React, { FC } from 'react'
import Button from 'src/components/Button'
import { IMovie, ISlide } from 'src/interfaces'
import './SlideInfo.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

interface ISlideInfo {
    slide: ISlide,
    reverse?: boolean
}

const SlideInfo:FC<ISlideInfo> = ({slide, reverse}) => {
    const arrMovies: IMovie[] = useSelector(({storePages}) => storePages.arrMovies);
    const navigate = useNavigate();
    let filmTitle, filmGenres;
    const isMovie = typeof slide.movie_id === 'number' && slide.movie_id !== 0;
    const isMain = isMovie || slide.text_button;
    console.log(isMovie);
    console.log(isMain);
    console.log(slide.movie_id);

    if (arrMovies.length && slide.movie_id && isMovie) {
        filmTitle = arrMovies[slide.movie_id].title;
        filmGenres = arrMovies[slide.movie_id].genres.join(', ') + ', ' + arrMovies[slide.movie_id].age + '+';
    }

    const clickButton = () => {
        if (isMovie) {
            navigate(`/afisha/${slide.movie_id}`, {state: {fromPage: '/main'}});
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
                                {slide.text_button ? slide.text_button : 'Купить билет'}
                            </Button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SlideInfo
