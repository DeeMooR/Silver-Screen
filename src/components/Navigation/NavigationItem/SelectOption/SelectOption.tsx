import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getArrDate, getArrSelect, formateDateItem, getArrSoonDatesWithWeek, setDateStore } from 'src/helpers';
import { IMovie } from 'src/interfaces';
import './SelectOption.css'

interface ISelectOption {
    type: string,
    handleClick: (type: string) => void,
}

const SelectOption:FC<ISelectOption> = ({type, handleClick}) => {
    const dispatch = useDispatch();
    const arrMovies: IMovie[] = useSelector(({storePages}) => storePages.movies);
    const idMovie = useSelector(({store}) => store.idActiveMoviePage);
    const searchDate = useSelector(({store}) => store.search.date);
    const movieTypeSelect = useSelector(({store}) => store.movieTypeSelect);
    const typeKey = useSelector(({store}) => store.search[type]);

    const [arrMoviesDates, setArrMoviesDates] = useState<string[]>([]);
    const [clickCheckbox, setClickCheckbox] = useState<string[]>([]);

    // отображаеются выбранные ранее параметры
    useEffect(() => {
        setClickCheckbox(typeKey);
    }, [typeKey]);
    
    const arrDate: string[] = (movieTypeSelect === 'already') ? getArrDate() : getArrSoonDatesWithWeek();
    const arrSelect: string[] = getArrSelect(type);     // массив параметров выбора
    const arrShortLang: string[] = getArrSelect('shortLang');   // массив короткиx LNG
    const movie = arrMovies.find(movie => movie.id === idMovie);
    
    // устанавливаем массив всех дат или дат фильма
    useEffect(() => {
        const filterOutputDates = () => {
            if (movie) {
                // получаем массив дат фильма
                const newArrMoviesDates = movie.schedule.map(item => item.date)
                .map(item => {
                    for (let itemWithDayOfWeek of arrDate) {
                        if (itemWithDayOfWeek.split(', ')[1] === item) return itemWithDayOfWeek;
                    }
                    return '';
                })
                .filter(item => item !== '');
                setArrMoviesDates(newArrMoviesDates);

                // меняем активную дату с сегодняшней на 1 у фильма
                if (searchDate === arrDate[0]) {
                    setDateStore(newArrMoviesDates[0], dispatch);
                }
            }
        }
        if (movie) filterOutputDates();
        else setArrMoviesDates(arrDate);
    },[movie, movieTypeSelect])

    // устанавливаем выбранную дату
    const handleClickItem = (i: number) => {
        handleClick('');    // Скрывает slidebar после нажатия (1/2)
        dispatch({ type: "TOGGLE_NAV_ACTIVE", payload: '' });
        dispatch({ 
            type: "SET_SEARCH", 
            payload: {
                type: 'date', 
                data: arrMoviesDates[i]
            } 
        });
    }

    // изменяем выбранные параметры
    const handleClickCheckbox = (i: number, event: React.MouseEvent<HTMLLabelElement | HTMLSpanElement>) => {
        if (event.target === event.currentTarget) {
            setClickCheckbox(prevArr => {
                let newArr;
                // добавить или удалить параметр из массива выбранных
                if (type === 'language') {
                    if (prevArr.includes(arrShortLang[i])) newArr = prevArr.filter(item => item !== arrShortLang[i]);
                    else newArr = [...prevArr, arrShortLang[i]];
                } else {
                    if (prevArr.includes(arrSelect[i])) newArr = prevArr.filter(item => item !== arrSelect[i]);
                    else newArr = [...prevArr, arrSelect[i]];
                }
                dispatch({ 
                    type: "SET_SEARCH", 
                    payload: {
                        type: `${type}`, 
                        data: newArr
                    } 
                });
                return newArr;
            });
            handleClick('');    // Скрывает slidebar после нажатия (2/2)
            dispatch({ type: "TOGGLE_NAV_ACTIVE", payload: '' });
        }
    };
    
    return (
        <>
        {arrMoviesDates.length &&
            <div className='selectOption'>
                <div className="selectOption__text">
                    {type === 'date' ? (
                        <>
                        {arrMoviesDates.length ?
                            arrMoviesDates.map((item: string, i: number) => (
                                <p className={`selectOption__item ${typeKey === item ? 'active' : ''}`} onClick={() => handleClickItem(i)} key={i}>
                                    {typeKey === item ? '✔ ' : ''}{formateDateItem(item)}
                                </p>
                            ))
                            : 
                            <p className='selectOption__item'>Пусто</p>
                        }
                        </>
                    ) : (
                        <>
                        <p className='selectOption__title'>
                            {type === 'video' && 'Формат:'}
                            {type === 'audio' && 'Аудио:'}
                            {type === 'language' && 'Язык:'}
                        </p>
                        {arrSelect.map((item: string, i: number) => (
                            <>
                            {type === 'video' && i === 2 && 
                                <p className='selectOption__title'>Экран:</p>
                            }
                            <label className='selectOption__choise' onClick={(event) => handleClickCheckbox(i, event)} key={i}>
                                {item}
                                <input type="checkbox" />
                                <span 
                                    className={`checkmark ${clickCheckbox.includes(arrSelect[i]) || clickCheckbox.includes(arrShortLang[i]) ? 'click' : ''}`} 
                                    onClick={(event) => handleClickCheckbox(i, event)} 
                                ></span>
                            </label>
                            </>
                        ))}
                        </>
                    )}
                </div>
            </div>
        }
        </>
    )
}

export default SelectOption
