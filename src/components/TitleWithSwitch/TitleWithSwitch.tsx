import React, { FC } from 'react'
import './TitleWithSwitch.css'

interface ITitleWithSwitch {
    title: string,
    switch_1: string,
    switch_2: string,
    active: number,
    setActive: (v: number) => void
}

const TitleWithSwitch:FC<ITitleWithSwitch> = ({title, switch_1, switch_2, active, setActive}) => {
    return (
        <div className='titleWithSwitch'>
            <h2 className='titleWithSwitch__title'>{title}</h2>
            <div className='titleWithSwitch__switch'>
                <a className={`${active === 1 ? 'active' : ''}`} onClick={() => setActive(1)} >{switch_1}</a>
                <a className={`${active === 2 ? 'active' : ''}`} onClick={() => setActive(2)} >{switch_2}</a>
            </div>
        </div>
    )
}

export default TitleWithSwitch
