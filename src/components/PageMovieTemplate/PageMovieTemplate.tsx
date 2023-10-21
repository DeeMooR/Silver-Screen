import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'
import './PageMovieTemplate.css'
import { BackgroundImage } from './styled'
import { IMovie } from 'src/interfaces'

import left from "src/icons/left.svg"
import { useNavigate } from 'react-router-dom'

interface IPageMovieTemplate {
    children: ReactNode,
    movie: IMovie,
}

const PageMovieTemplate:FC<IPageMovieTemplate> = ({children, movie}) => {
    const navigate = useNavigate();
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);

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
    
    return (
        <>
        <BackgroundImage image={movie.image}></BackgroundImage>
            <div className='pageMovieTemplate'>
                <div className={`pageMovieTemplate__header ${isScrolled ? 'scrollHeader' : ''}`}>
                    <div className="header__wrapper">
                        <img src={left} onClick={() => navigate(-1)} alt="left"/>
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
