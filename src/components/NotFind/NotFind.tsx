import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../Button'
import { formateDateItem, getArrDate, getArrSoonDatesWithWeek, setDateStore } from 'src/helpers/helper';
import './NotFind.css'

interface INotFind {
    page: 'afisha' | 'main'
}

const NotFind:FC<INotFind> = ({page}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const movieTypeSelect: string = useSelector(({store}) => store.movieTypeSelect);
    const search = useSelector(({store}) => store.search);
    
    const [searchFilled, setSearchFilled] = useState(false);
    const arrDate = (movieTypeSelect === 'already') ? getArrDate() : getArrSoonDatesWithWeek();

    // проверить есть ли выбранные параметры
    useEffect(() => {
        if ((search.date === getArrDate()[0] || search.date === getArrSoonDatesWithWeek()[0]) && !search.video.length && !search.audio.length && !search.language.length) setSearchFilled(false);
        else setSearchFilled(true);
    }, [search])

    // текст для след дня
    const indexArrDay = arrDate.indexOf(search.date);
    const showNextDay = (indexArrDay !== arrDate.length - 1) ? formateDateItem(arrDate[indexArrDay + 1]) : formateDateItem(arrDate[0]);

    // очистить фильтры
    const clearSearch = () => {
        dispatch({ type: "CLEAR_SEARCH", payload: arrDate[0] });
    }

    // установить след день
    const setNextDay = () => {
        if (indexArrDay !== arrDate.length - 1) setDateStore(arrDate[indexArrDay + 1], dispatch);
        else setDateStore(arrDate[0], dispatch);
    }

    // изменить фильмы на Скоро
    const clickSoon = () => {
        navigate('/afisha');
        dispatch({ type: "SET_MOVIE_TYPE_SELECT", payload: "soon" });
    }
    // изменить фильмы на Сейчас в кино
    const clickAlready = () => {
        navigate('/afisha');
        dispatch({ type: "SET_MOVIE_TYPE_SELECT", payload: "already" });
    }
    
    return (
        <div className={`not-find ${page === 'main' ? 'not-find-small' : ''}`}>
            <h2 className='not-find__text'>Не нашли фильм?</h2>
            {page === 'main' 
            ? <Button color='white' handleClick={clickAlready} becomeSmall>Все фильмы</Button>
            : <Button color='white' handleClick={setNextDay}>{showNextDay}</Button>
            }
            {movieTypeSelect === "already"
            ? <Button color="white" becomeSmall={page === "main" && true} handleClick={clickSoon} >Скоро в кино</Button>
            : page === 'afisha' && <Button color='white' handleClick={clickAlready}>Сейчас в кино</Button>
            }
            {searchFilled && 
                <Button color='red' isMin handleClick={clearSearch}>Очистить фильтры</Button>
            }
        </div>
    )
}

export default NotFind
