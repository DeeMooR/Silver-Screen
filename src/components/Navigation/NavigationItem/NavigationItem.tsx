import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
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
    const todayDate = getTodayDate();
    const [searchArr, setSearchArr] = useState<string[]>([]);
    const [searchDate, setSearchDate] = useState<string>(todayDate);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch({ 
    //         type: "SET_SEARCH", 
    //         payload: {
    //             type: 'date', 
    //             data: todayDate
    //         } 
    //     });
    // },[]);

    const handleClick = () => {
        setIsRotated(!isRotated);
    };

    return (
        <>
        <div className="navigationItem" onClick={handleClick}>
            <img src={icon} className="navigationItem__image" alt="icon" />
            <p className="navigationItem__text">
                {type === 'date' ? searchDate :
                    (searchArr.length !== 0 ? searchArr.join(', ') : text)
                }
            </p>
            <img src={arrow} className={`navigationItem__arrow ${isRotated && 'rotate'}`} alt="arrow" />
        </div>
        <div className={`navigationItem__choise-block ${isRotated ? 'show' : ''}`}>
            <SelectOption type={type} searchDate={searchDate} setSearchDate={setSearchDate} setSearchArr={setSearchArr} />
        </div>
        </>
    );
}

export default NavigationItem
