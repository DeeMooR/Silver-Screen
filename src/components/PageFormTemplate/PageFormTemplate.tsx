import React, { FC, ReactNode } from 'react'
import './PageFormTemplate.css'
import { BackgroundImage } from './styled'
import { useLocation, useNavigate } from 'react-router-dom'

import background from "src/icons/sign_background.png"
import left from "src/icons/left.svg"

interface IPageFormTemplate {
    children: ReactNode,
    page: string,
}

const PageFormTemplate:FC<IPageFormTemplate> = ({children, page}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const clickLeft = () => {
        if (location.state && location.state.fromPage === 'account') navigate('/');
        else navigate(-1);
    }
    return (
        <div className='pageFormTemplate'>
            <div className="pageFormTemplate__left" onClick={clickLeft}>
                <img src={left} alt="left" />
            </div>
            <BackgroundImage image={background} />
            <div className="pageFormTemplate__form">
                <p className={`pageFormTemplate__title ${page === 'Sign Up' ? 'title-small' : ''}`}>{page}</p>
                {children}
            </div>
            <p className='pageFormTemplate__license'>© All Rights Reserved</p>
        </div>
    )
}

export default PageFormTemplate
