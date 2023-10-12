import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button'
import { getArrDate, getTomorrowDate } from 'src/helpers';
import './NotFind.css'

const NotFind = () => {
    const dispatch = useDispatch();
    const [searchFilled, setSearchFilled] = useState(false);
    const tomorrowDate = getTomorrowDate();
    const search = useSelector(({ search }) => search);
    
    useEffect(() => {
        if (search.date === getArrDate()[0] && !search.video.length && !search.audio.length && !search.language.length) setSearchFilled(false);
        else setSearchFilled(true);
    }, [search])

    const clearSearch = () => {
        localStorage.removeItem('date');    // без этой строчки в Afisha нельзя обработать исключительно эту ситуацию
        dispatch({ type: "CLEAR_SEARCH", payload: getArrDate()[0] });
    }
    
    return (
        <>
        <h2 className='afisha__not-find'>Не нашли фильм?</h2>
        <Button color='white'>завтра, {tomorrowDate}</Button>
        <Button color='white'>Скоро в кино</Button>
        {searchFilled && 
            <Button color='red' isMin handleClick={clearSearch}>Очистить фильтры</Button>
        }
        </>
    )
}

export default NotFind
