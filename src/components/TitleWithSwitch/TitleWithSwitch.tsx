import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import './TitleWithSwitch.css'

interface ITitleWithSwitch {
    title: string,
    switch_1: string,
    switch_2: string,
    active: number,
    setActive: (v: number) => void
}

const TitleWithSwitch:FC<ITitleWithSwitch> = ({title, switch_1, switch_2, active, setActive}) => {
    const dispatch = useDispatch();

    // сделать активным 1
    const clickFirst = () => {
        setActive(1);
        if (title === 'Афиша кино') dispatch({ type: "SET_MOVIE_TYPE_SELECT", payload: 'already' });
        else setActive(1)
    }

    // сделать активным 2
    const clickSecond = () => {
        setActive(2);
        if (title === 'Афиша кино') dispatch({ type: "SET_MOVIE_TYPE_SELECT", payload: 'soon' });
    }

    return (
        <div className='titleWithSwitch'>
            <h2 className='titleWithSwitch__title'>{title}</h2>
            <div className='titleWithSwitch__switch'>
                <a className={`${active === 1 ? 'active' : ''}`} onClick={clickFirst} >{switch_1}</a>
                <a className={`${active === 2 ? 'active' : ''}`} onClick={clickSecond} >{switch_2}</a>
            </div>
        </div>
    )
}

export default TitleWithSwitch
