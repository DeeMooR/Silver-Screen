import React from 'react'
import Button from '../Button'
import { getTomorrowDate } from 'src/helpers';
import './NotFind.css'

const NotFind = () => {
    const tomorrowDate = getTomorrowDate();
    
    return (
        <>
        <h2 className='afisha__not-find'>Не нашли фильм?</h2>
        <Button color='white'>завтра, {tomorrowDate}</Button>
        <Button color='white'>Скоро в кино</Button>
        </>
    )
}

export default NotFind
