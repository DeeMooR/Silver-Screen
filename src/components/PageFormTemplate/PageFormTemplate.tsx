import React, { FC, ReactNode } from 'react'
import './PageFormTemplate.css'
import { BackgroundImage } from './styled'
import { useNavigate } from 'react-router-dom'

import background from "src/icons/sign_background.png"
import left from "src/icons/left.svg"

interface IPageFormTemplate {
    children: ReactNode,
    page: string,
}

const PageFormTemplate:FC<IPageFormTemplate> = ({children, page}) => {
    const navigate = useNavigate();
    return (
        <div className='pageFormTemplate'>
             {localStorage.getItem('access') &&
                <div className="pageFormTemplate__left" onClick={() => navigate(-1)}>
                    <img src={left} alt="left" />
                </div>
            }
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
