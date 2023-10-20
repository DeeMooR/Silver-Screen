import React, { FC, ReactNode } from 'react'
import './Page404.css'
import { BackgroundImage } from './styled'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import background from "src/icons/page_404.png"

const Page404 = () => {
    const navigate = useNavigate();

    const clickBack = () => {
        navigate(-1);
    };

    return (
        <div className='page404'>
            <BackgroundImage image={background} />
            <div className="page404__content">
                <p className='page404__title'>404. Страница не найдена</p>
                <p className='page404__text'>Возможно, она была перемещена, или вы просто неверно указали адрес страницы.</p>
                <a className='page404__button' onClick={() => navigate(-1)}>Вернуться назад</a>
                <Link to='/' className='page404__button'>Перейти на главную</Link>
            </div>
        </div>
    )
}

export default Page404
