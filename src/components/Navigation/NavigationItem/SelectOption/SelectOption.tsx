import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getArrDate, getArrSelect } from 'src/helpers';
import './SelectOption.css'

interface ISelectOption {
    type: string,
    searchDate: string,
    setSearchDate: (v: string) => void,
    setSearchArr: (v: string[]) => void
}

const SelectOption:FC<ISelectOption> = ({type, searchDate, setSearchDate, setSearchArr}) => {
    const [clickCheckbox, setClickCheckbox] = useState<string[]>([]);
    // const typeKey = useSelector(({ search }) => search[type]);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     setClickCheckbox(typeKey);
    // }, [typeKey]);

    const arrDate: string[] = getArrDate();
    const arrSelect: string[] = getArrSelect(type);

    const handleClickItem = (i: number) => {
        setSearchDate(arrDate[i]);
        // dispatch({ 
        //     type: "SET_SEARCH", 
        //     payload: {
        //         type: 'date', 
        //         data: arrDate[i]
        //     } 
        // });
    }

    const handleClickCheckbox = (i: number, event: React.MouseEvent<HTMLLabelElement | HTMLSpanElement>) => {
        if (event.target === event.currentTarget) {
            setClickCheckbox(prevArr => {
                let newArr;
                if (prevArr.includes(arrSelect[i])) newArr = prevArr.filter(item => item !== arrSelect[i]);
                else newArr = [...prevArr, arrSelect[i]];
                // dispatch({ 
                //     type: "SET_SEARCH", 
                //     payload: {
                //         type: {type}, 
                //         data: newArr
                //     } 
                // });
                setSearchArr(newArr);
                return newArr;
            });
        }
    };

    return (
        <div className='selectOption'>
            <div className="selectOption__text">
                {type === 'date' ? 
                    arrDate.map((item: string, i: number) => (
                        <p className={`selectOption__item ${searchDate === item ? 'active' : ''}`} onClick={() => handleClickItem(i)}>
                            {searchDate === item ? '✔ ' : ''}{item}
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
                        <label className='selectOption__choise' onClick={(event) => handleClickCheckbox(i, event)}>
                            {item}
                            <input type="checkbox" />
                            <span 
                                className={`checkmark ${clickCheckbox.includes(arrSelect[i]) ? 'click' : ''}`} 
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
