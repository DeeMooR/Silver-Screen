import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getArrDate, getArrSelect, formateDateItem } from 'src/helpers';
import './SelectOption.css'

interface ISelectOption {
    type: string,
    searchDate: string,
    setSearchDate: (value: string) => void,
    setSearchArr: (value: string[]) => void,
    handleClick: (type: string) => void,
}

const SelectOption:FC<ISelectOption> = ({type, searchDate, setSearchDate, setSearchArr, handleClick}) => {
    const [clickCheckbox, setClickCheckbox] = useState<string[]>([]);

    const typeKey = useSelector(({ search }) => search[type]);
    const dispatch = useDispatch();
    useEffect(() => {
        setClickCheckbox(typeKey);
    }, [typeKey]);

    const arrDate: string[] = getArrDate();
    const arrSelect: string[] = getArrSelect(type);
    const arrShortLang: string[] = getArrSelect('shortLang');

    const handleClickItem = (i: number) => {
        setSearchDate(arrDate[i]);
        handleClick('');    // Скрывает slidebar после нажатия (1/2)
        dispatch({ type: "TOGGLE_NAV_ACTIVE", payload: '' });
        dispatch({ 
            type: "SET_SEARCH", 
            payload: {
                type: 'date', 
                data: arrDate[i]
            } 
        });
    }

    const handleClickCheckbox = (i: number, event: React.MouseEvent<HTMLLabelElement | HTMLSpanElement>) => {
        if (event.target === event.currentTarget) {
            setClickCheckbox(prevArr => {
                let newArr;
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
                setSearchArr(newArr);
                return newArr;
            });
            handleClick('');    // Скрывает slidebar после нажатия (2/2)
            dispatch({ type: "TOGGLE_NAV_ACTIVE", payload: '' });
        }
    };

    return (
        <div className='selectOption'>
            <div className="selectOption__text">
                {type === 'date' ? 
                    arrDate.map((item: string, i: number) => (
                        <p className={`selectOption__item ${searchDate === item ? 'active' : ''}`} onClick={() => handleClickItem(i)} key={i}>
                            {searchDate === item ? '✔ ' : ''}{formateDateItem(item)}
                        </p>
                    ))
                :
                    <>
                    <p className='selectOption__title'>
                        {type === 'video' && 'Видео:'}
                        {type === 'audio' && 'Аудио:'}
                        {type === 'language' && 'Язык:'}
                    </p>
                    {arrSelect.map((item: string, i: number) => (
                        <label className='selectOption__choise' onClick={(event) => handleClickCheckbox(i, event)} key={i}>
                            {item}
                            <input type="checkbox" />
                            <span 
                                className={`checkmark ${clickCheckbox.includes(arrSelect[i]) || clickCheckbox.includes(arrShortLang[i]) ? 'click' : ''}`} 
                                onClick={(event) => handleClickCheckbox(i, event)} 
                            ></span>
                        </label>
                    ))}
                    </>
                }
            </div>
        </div>
    )
}

export default SelectOption
