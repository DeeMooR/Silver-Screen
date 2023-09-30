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
    const todayDate = getTodayDate();
    const [isActive, setIsActive] = useState(false);
    const [searchArr, setSearchArr] = useState<string[]>([]);
    const [searchDate, setSearchDate] = useState<string>(todayDate);
    const activeStore = useSelector(({ navActive }) => navActive);
    const dispatch = useDispatch();

    useEffect(() => {
        if (activeStore !== type) setIsActive(false);
    }, [activeStore])

    const handleClick = () => {
        setIsActive(prev => {
            const newIsActive = !prev;
            if (newIsActive) dispatch({ type: "TOGGLE_NAV_ACTIVE", payload: type })
            else if (activeStore === type) dispatch({ type: "TOGGLE_NAV_ACTIVE", payload: '' })
            return newIsActive;
        });
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
            <img src={arrow} className={`navigationItem__arrow ${isActive && 'rotate'}`} alt="arrow" />
        </div>
        <div className={`navigationItem__choise-block ${isActive ? 'show' : ''}`}>
            <SelectOption type={type} searchDate={searchDate} setSearchDate={setSearchDate} setSearchArr={setSearchArr} />
        </div>
        </>
    );
}

export default NavigationItem
