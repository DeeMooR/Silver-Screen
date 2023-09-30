import React, { FC, useState } from 'react'
import SelectOption from './SelectOption';
import { getTodayDate } from 'src/helpers';
import './NavigationItem.css'

import arrow from "../../../icons/arrow-button.png"

interface INavigationItem {
    icon: string,
    text?: string,
    type: string
}

const NavigationItem:FC<INavigationItem> = ({icon, text, type}) => {
    const [isRotated, setIsRotated] = useState(false);
    const date = getTodayDate();

    const handleClick = () => {
        setIsRotated(!isRotated);
    };

    return (
        <>
        <div className="navigationItem" onClick={handleClick}>
            <img src={icon} className="navigationItem__image" alt="icon" />
            <p className="navigationItem__text">
                {type === 'calendar' ? `сегодня, ${date}` : `${text}`}
            </p>
            <img src={arrow} className={`navigationItem__arrow ${isRotated && 'rotate'}`} alt="arrow" />
        </div>
        <div className={`navigationItem__choise-block ${isRotated ? 'show' : ''}`}>
            <SelectOption type={type} />
        </div>
        </>
    );
}

export default NavigationItem
