import React, { FC, useEffect, useState } from 'react'
import { IDataInputAdmin } from 'src/helpers'
import './InputAdmin.css'

interface IInputAdmin {
    obj: IDataInputAdmin,
    clearInput: boolean,
    updateObj: (field: string, value: any) => void
}

const InputAdmin:FC<IInputAdmin> = ({obj, clearInput, updateObj}) => {
    const [value, setValue] = useState('');
    const [isChecked, setChecked] = useState(false);

    // изменить название поля
    const isSurely = (obj.name[obj.name.length - 1] === '?') ? true : false;
    const newName = (isSurely) ? obj.name.slice(0, -1) : obj.name;
    const arrRadio = (obj.type.includes('|')) ?  obj.type.split('|') : [];

    // очистить поля ввода
    useEffect(() => {
        if (clearInput) setValue('');
    }, [clearInput]);

    // обновить значение поля в объекте
    const changeValue = (value: string, isArr?: boolean) => {
        setValue(value);
        if (isArr) {
            const addArr = value.split(', ');
            updateObj(obj.name, addArr);
        } 
        else {
            updateObj(obj.name, value);
        }
    }

    // обновить значение checkbox в объекте
    const changeCheckbox = () => {
        setChecked(!isChecked);
        updateObj(obj.name, !isChecked);
    }

    return (
        <div className='inputAdmin'>
            {(obj.type !== 'boolean' && !arrRadio.length) &&
                <>
                <p className={`inputAdmin__title ${isSurely ? '' : 'surely'}`}>{newName}: {obj.type}</p>
                <input className='inputAdmin__input' type='text' placeholder={newName} value={value} onChange={(e) => changeValue(e.currentTarget.value, obj.type.includes('[]'))} />
                </>
            }
            {obj.type === 'boolean' &&
                <div className='inputAdmin__checkbox'>
                    <input type="checkbox" onClick={changeCheckbox} />
                    <label>{obj.name}</label>
                </div>
            }
            {!!arrRadio.length &&
                <div className='inputAdmin__radiobox'>
                    {arrRadio.map((item, index) => (
                        <div key={index}>
                            <input type="radio" name={obj.name} onChange={(e) => changeValue(item)} />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default InputAdmin
