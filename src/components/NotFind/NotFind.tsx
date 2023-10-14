import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button'
import { formateDateItem, getArrDate, getTomorrowDate, setTodayDateStore } from 'src/helpers';
import './NotFind.css'
import { useNavigate } from 'react-router-dom';

interface INotFind {
    page: 'afisha' | 'main'
}

const NotFind:FC<INotFind> = ({page}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchFilled, setSearchFilled] = useState(false);
    const search = useSelector(({ search }) => search);

    const arrDate = getArrDate();
    const indexArrDay = arrDate.indexOf(search.date);
    let showNextDay;
    if (indexArrDay !== arrDate.length - 1) showNextDay = formateDateItem(arrDate[indexArrDay + 1]);
    else showNextDay = formateDateItem(arrDate[0]);
    
    useEffect(() => {
        if (search.date === getArrDate()[0] && !search.video.length && !search.audio.length && !search.language.length) setSearchFilled(false);
        else setSearchFilled(true);
    }, [search])

    const clearSearch = () => {
        setTodayDateStore(arrDate[0], dispatch);
    }
    const setNextDay = () => {
        if (indexArrDay !== arrDate.length - 1) setTodayDateStore(arrDate[indexArrDay + 1], dispatch);
        else setTodayDateStore(arrDate[0], dispatch);
    }
    
    return (
        <div className={`not-find ${page === 'main' ? 'not-find-small' : ''}`}>
            <h2 className='not-find__text'>Не нашли фильм?</h2>
            {page === 'main'
            ? <Button color='white' handleClick={() => navigate('/afisha')} becomeSmall>Все фильмы</Button>
            : <Button color='white' handleClick={setNextDay}>{showNextDay}</Button>
            }
            <Button color='white' becomeSmall={page === 'main' && true}>Скоро в кино</Button>
            {searchFilled && 
                <Button color='red' isMin handleClick={clearSearch}>Очистить фильтры</Button>
            }
        </div>
    )
}

export default NotFind
