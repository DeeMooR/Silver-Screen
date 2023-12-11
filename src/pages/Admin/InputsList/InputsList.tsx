import React, { FC, useEffect, useState } from 'react'
import InputAdmin from '../InputAdmin'
import { IDataInputAdmin } from 'src/helpers'
import './InputsList.css'

interface IIputsList {
    title: string,
    list: IDataInputAdmin[],
    setObjAdmin: (value: {}) => void
}

const InputsList:FC<IIputsList> = ({title, list, setObjAdmin}) => {
    const [objValues, setObjValues] = useState<{ [key: string]: any }>({});
    const [clearInput, setClearInput] = useState(false);

    // установить новый пустой объект и вернуть его
    useEffect(() => {
        setClearInput(true);
        const newObj: { [key: string]: any } = {};
        list.forEach((item) => {
          if (item.type.includes('[]')) newObj[item.name] = [];
          else if (item.type === 'boolean') newObj[item.name] = false;
          else newObj[item.name] = '';
        });
        setObjValues(newObj);
        setObjAdmin(newObj);
    }, [list]);

    // обновить объект введённых данных
    const updateObj = (field: string, value: any) => {
        const newObj = { ...objValues, [field]: value };
        setClearInput(false);
        setObjValues(newObj);
        setObjAdmin(newObj);
      };

    return (
        <div className='inputsList'>
            <p className='inputsList__subtitle'>{title}</p>
            <div className='inputsList__flex'>
                {list.map((item, index) => (
                    <div className='inputsList__item' key={index}>
                        <InputAdmin obj={item} updateObj={updateObj} clearInput={clearInput} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InputsList
