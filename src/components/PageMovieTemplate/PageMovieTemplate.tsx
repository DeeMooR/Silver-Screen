import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { IMovie } from 'src/interfaces'
import { BackgroundImage } from './styled'
import './PageMovieTemplate.css'

import left from "src/icons/left.svg"

interface IPageMovieTemplate {
    children: ReactNode,
    movie: IMovie,
    customBack?: string,
    fromPage?: string
}

const PageMovieTemplate:FC<IPageMovieTemplate> = ({children, movie, customBack, fromPage}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);

    // изменяется header если был скролл
    useEffect(() => {
        const handleScroll = () => {
            const scrollBlock = scrollRef.current;
            if (scrollBlock) {
                if (scrollBlock.scrollTop > 0) {
                    setIsScrolled(true);
                } else {
                    setIsScrolled(false);
                }
            }
          };
        const scrollBlock = scrollRef.current;
        if (scrollBlock) scrollBlock.addEventListener('scroll', handleScroll);
        return () => {
            if (scrollBlock) scrollBlock.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // переход назад
    const clickBack = () => {
        if (fromPage === '/buy-ticket') dispatch({ type: "CLEAR_MY_SEAT_SELECT" });
        if (fromPage) navigate(`${customBack}`, {state: {fromPage: fromPage}});
        else if (customBack) navigate(`${customBack}`);
        else navigate(-1);
    }
    
    return (
        <>
        <BackgroundImage image={movie.image}></BackgroundImage>
            <div className='pageMovieTemplate'>
                <div className={`pageMovieTemplate__header ${isScrolled ? 'scrollHeader' : ''}`}>
                    <div className="header__wrapper">
                        <img src={left} onClick={clickBack} alt="left"/>
                        <span>{movie.title}</span>
                    </div>
                </div>
                <div className="pageMovieTemplate__scroll" ref={scrollRef}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default PageMovieTemplate
