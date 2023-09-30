import React, { FC, useState } from 'react'
import { getArrayDate } from 'src/helpers';
import { IDate } from 'src/interfaces';
import './SelectOption.css'

interface ISelectOption {
    type: string
}

const SelectOption:FC<ISelectOption> = ({type}) => {
    const [clickCheckbox, setClickCheckbox] = useState<number[]>([]);
    const [clickItem, setClickItem] = useState<number>(0);
    const arrDate: IDate[] = getArrayDate();
    let arrSelect: string[] = [];

    switch(type) {
        case 'video': arrSelect = ['2D', '3D', 'ScreenX', 'IMAX']; break;
        case 'audio': arrSelect = ['Dolby Digital', 'Dolby Atmos', 'Harman Kardon']; break;
        case 'language': arrSelect = ['Русский язык', 'Беларуская мова', 'English', 'SUB']; break;
        default: arrSelect = ['ошибка'];
    }

    const handleClickCheckbox = (i: number, event: React.MouseEvent<HTMLLabelElement | HTMLSpanElement>) => {
        if (event.target === event.currentTarget) {
            setClickCheckbox(prevArr => {
                if (prevArr.includes(i)) {
                    return prevArr.filter(item => item !== i);
                } else {
                    return [...prevArr, i];
                }
            });
        }
    };
    console.log(clickItem);
    console.log(clickCheckbox);

    return (
        <div className='selectOption'>
            <div className="selectOption__text">
                {type === 'calendar' ? 
                    arrDate.map((item: IDate, i: number) => (
                        <p className={`selectOption__item ${clickItem === i ? 'active' : ''}`} onClick={() => setClickItem(i)}>
                            {clickItem === i ? '✔ ' : ''}{item.dayOfWeek}, {item.dateNumMonth}
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
                                className={`checkmark ${clickCheckbox.includes(i) ? 'click' : ''}`} 
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
