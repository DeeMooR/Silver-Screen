import React, { FC, useState } from 'react'
import { getArrayDate } from 'src/helpers';
import { IDate } from 'src/interfaces';
import './SelectOption.css'

interface ISelectOption {
    type: string
}

const SelectOption:FC<ISelectOption> = ({type}) => {
    const [clickItem, setClickItem] = useState<number[]>([]);
    const arrDate: IDate[] = getArrayDate();
    let arrSelect: string[] = [];

    switch(type) {
        case 'video': arrSelect = ['2D', '3D', 'ScreenX', 'IMAX'];
            break;
        case 'audio': arrSelect = ['Dolby Digital', 'Dolby Atmos', 'Harman Kardon'];
            break;
        case 'language': arrSelect = ['Русский язык', 'Беларуская мова', 'English', 'SUB'];
            break;
        default: arrSelect = ['ошибка'];
    }

    const handleClickItem = (i: number, event: React.MouseEvent<HTMLLabelElement | HTMLSpanElement>) => {
        if (event.target === event.currentTarget) {
            setClickItem(prevArr => {
                if (prevArr.includes(i)) {
                    return prevArr.filter(item => item !== i);
                } else {
                    return [...prevArr, i];
                }
            });
        }
    };
    console.log(clickItem);
    return (
        <div className='selectOption'>
            <div className="selectOption__text">
                {type === 'calendar' ? 
                    arrDate.map((item: IDate, i: number) => (
                        <a href='#' className={`selectOption__item ${i === 0 ? 'active' : ''}`}>
                            {i === 0 ? '✔ ' : ''}{item.dayOfWeek}, {item.dateNumMonth}
                        </a>
                    ))
                :
                    <>
                    <p className='selectOption__title'>
                        {type === 'video' && 'Видео:'}
                        {type === 'audio' && 'Аудио:'}
                        {type === 'language' && 'Язык:'}
                    </p>
                    {arrSelect.map((item: string, i: number) => (
                        <label className='selectOption__choise' onClick={(event) => handleClickItem(i, event)}>
                            <span 
                                className={`checkmark ${clickItem.includes(i) ? 'click' : ''}`} 
                                onClick={(event) => handleClickItem(i, event)} 
                            ></span>
                            {item}
                            <input type="checkbox" />
                        </label>
                    ))}
                    </>
                }
            </div>
        </div>
    )
}

export default SelectOption
