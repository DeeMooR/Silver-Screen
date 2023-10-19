import React, { FC } from 'react'
import './TitleWithSwitch.css'

interface ITitleWithSwitch {
    title: string,
    switch_1: string,
    switch_2: string,
    active: '1' | '2'
}

const TitleWithSwitch:FC<ITitleWithSwitch> = ({title, switch_1, switch_2, active}) => {
    return (
        <div className='titleWithSwitch'>
            <h2 className='titleWithSwitch__title'>{title}</h2>
            <div className='titleWithSwitch__switch'>
                <a href="#" className={`${active === '1' ? 'active' : ''}`}>{switch_1}</a>
                <a href="#" className={`${active === '2' ? 'active' : ''}`}>{switch_2}</a>
            </div>
        </div>
    )
}

export default TitleWithSwitch
