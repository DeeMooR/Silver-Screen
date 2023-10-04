import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SelectOption from './SelectOption';
import { getArrDate, formateDateItem } from 'src/helpers';
import './NavigationItem.css'

import arrow from "../../../icons/arrow-button.png"

interface INavigationItem {
    icon: string,
    text?: string,
    type: string,
    navActive: string,
    handleClick: (type: string) => void
}

const NavigationItem:FC<INavigationItem> = ({icon, text, type, navActive, handleClick}) => {
    const arrDate = getArrDate();
    const [searchArr, setSearchArr] = useState<string[]>([]);
    const [searchDate, setSearchDate] = useState<string>(arrDate[0]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ 
            type: "SET_SEARCH", 
            payload: {
                type: 'date',
                data: searchDate
            } 
        });
    },[]);

    return (
        <>
        <div className="navigationItem" onClick={() => handleClick(type)}>
            <img src={icon} className="navigationItem__image" alt="icon" />
            <p className="navigationItem__text">
                {type === 'date' ? formateDateItem(searchDate) :
                    (searchArr.length !== 0 ? searchArr.join(', ') : text)
                }
            </p>
            <img src={arrow} className={`navigationItem__arrow ${navActive == type && 'rotate'}`} alt="arrow" />
        </div>
        <div className={`navigationItem__choise-block ${navActive == type ? 'show' : ''}`}>
            <SelectOption type={type} searchDate={searchDate} setSearchDate={setSearchDate} setSearchArr={setSearchArr} handleClick={handleClick} />
        </div>
        </>
    );
}

export default NavigationItem
