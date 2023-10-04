import React, { useEffect, useState } from 'react'
import NavigationItem from './NavigationItem'
import './Navigation.css'

import calendar from "../../icons/calendar.png"
import video from "../../icons/video.png"
import audio from "../../icons/audio.png"
import language from "../../icons/language.png"
import { useDispatch, useSelector } from 'react-redux'

const Navigation = () => {
    const [navActive, setNavActive] = useState('');
    const dispatch = useDispatch();
    const navActiveStore = useSelector(({ navActive }) => navActive);

    useEffect(() => {
        setNavActive(navActiveStore);
    },[])

    const handleClick = (type: string) => {
        if (navActive === type) {
            setNavActive('');
            dispatch({ type: "TOGGLE_NAV_ACTIVE", payload: '' });
        } else {
            setNavActive(type);
            dispatch({ type: "TOGGLE_NAV_ACTIVE", payload: type });
        }
    };

    return (
        <div className='navigation'>
        <div className='navigation__item'><NavigationItem icon={calendar} type='date' navActive={navActive} handleClick={handleClick} /></div>
        <div className='navigation__item'><NavigationItem icon={video} text='Формат' type='video' navActive={navActive} handleClick={handleClick} /></div>
        <div className='navigation__item'><NavigationItem icon={audio} text='Звук' type='audio' navActive={navActive} handleClick={handleClick} /></div>
        <div className='navigation__item'><NavigationItem icon={language} text='Прочее' type='language' navActive={navActive} handleClick={handleClick} /></div>
        </div>
    )
}

export default Navigation
