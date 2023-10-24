import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button'
import { formateDateItem, getArrDate, setDateStore } from 'src/helpers';
import './NotFind.css'
import { useNavigate } from 'react-router-dom';

interface INotFind {
    page: 'afisha' | 'main'
}

const NotFind:FC<INotFind> = ({page}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const movieTypeSelect: string = useSelector(({store}) => store.movieTypeSelect);
    const [searchFilled, setSearchFilled] = useState(false);
    const search = useSelector(({store}) => store.search);

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
        dispatch({ type: "CLEAR_SEARCH", payload: arrDate[0] });
    }
    const setNextDay = () => {
        if (indexArrDay !== arrDate.length - 1) setDateStore(arrDate[indexArrDay + 1], dispatch);
        else setDateStore(arrDate[0], dispatch);
    }

    const clickSoon = () => {
        navigate('/afisha');
        dispatch({ type: "SET_MOVIE_TYPE_SELECT", payload: "soon" });
    }
    const clickAlready = (withNavigate: boolean) => {
        dispatch({ type: "SET_MOVIE_TYPE_SELECT", payload: "already" });
        if (withNavigate) navigate('/afisha');
    }

    
    return (
        <div className={`not-find ${page === 'main' ? 'not-find-small' : ''}`}>
            <h2 className='not-find__text'>Не нашли фильм?</h2>
            {page === 'main' ? ( 
                <Button color='white' handleClick={() => clickAlready(true)} becomeSmall>Все фильмы</Button>
            ) : (
                movieTypeSelect === 'already' 
                ? <Button color='white' handleClick={setNextDay}>{showNextDay}</Button>
                : <Button color='white' handleClick={() => clickAlready(false)}>Сейчас в кино</Button>
            )}
            {movieTypeSelect === "already" &&
                <Button
                    color="white"
                    becomeSmall={page === "main" && true}
                    handleClick={clickSoon}
                >Скоро в кино</Button>
            }
            {searchFilled && 
                <Button color='red' isMin handleClick={clearSearch}>Очистить фильтры</Button>
            }
        </div>
    )
}

export default NotFind
