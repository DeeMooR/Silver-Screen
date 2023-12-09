import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import ButtonForm from 'src/components/ButtonForm';
import InputsList from './InputsList';
import { ADD_DATA, ADD_MOVIE_AND_GENRES, ADD_SEANCE_AND_PLACES, CHAGE_CARD_STATUS, GET_ROOMS } from 'src/actions/actions';
import { ITable, tables } from 'src/helpers'
import { IForeignKeys, IRoom } from 'src/interfaces';
import './Admin.css'

import left from "src/icons/left.svg"

const Admin = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const navigate = useNavigate();
    const arrRooms: IRoom[] = useSelector(({storePages}) => storePages.rooms);
    const [modal, setModal] = useState(<div/>);
    const [active, setActive] = useState<ITable>(tables[0]);
    const [message, setMessage] = useState('');
    const [primaryKeys, setPrimaryKeys] = useState({});
    const [foreignKeys, setForeignKeys] = useState<IForeignKeys>({});
    const [fields, setFields] = useState<Record<string, any>>({});

    const clickOption = (item: ITable) => {
        setActive(item);
        setMessage('');
        setPrimaryKeys({});
        setForeignKeys({});
        setFields({});
    }

    const checkArrIsFill = (obj: Record<string, any>) => {
        for (const key in obj) {
            if (!key.includes('?')) {
                const value = obj[key];
                if (value === undefined || value === null || (Array.isArray(value) && value.length === 0) || (typeof value === 'string' && value.trim() === '')) {
                    setMessage('Заполните обязательные поля!');
                    return false;
                }
            }
        }
        return true;
    }

    const clickSend = () => {
        console.log('Primary Keys:', primaryKeys);
        console.log('Foreign Keys:', foreignKeys);
        console.log('Fields:', fields);

        if (!checkArrIsFill(fields) || !checkArrIsFill(primaryKeys) || !checkArrIsFill(foreignKeys)) return;
        setMessage('');
        const changedFiels: Record<string, any> = {};
        for (const key in fields) {
            const newKey = key.endsWith('?') ? key.slice(0, -1) : key;
            changedFiels[newKey] = fields[key];
        }

        if (active.title === 'seance') {
            const room = (foreignKeys.room_id) ? foreignKeys.room_id : '';
            const objRoom = arrRooms.find((item) => item.id === +room);
            if (objRoom) dispatch(ADD_SEANCE_AND_PLACES(changedFiels, foreignKeys, objRoom, setMessage));
            else setMessage('Ошибка');
            return;
        }
        if (active.title === 'movie') {
            const genres = foreignKeys.genres;
            if (genres) dispatch(ADD_MOVIE_AND_GENRES(changedFiels, genres, setMessage));
            else setMessage('Ошибка');
            return;
        }
        if (active.title === 'change card status') {
            const user_id = foreignKeys.user_id;
            const number_card = foreignKeys.number_card;
            if (user_id && number_card) dispatch(CHAGE_CARD_STATUS(user_id, number_card, setMessage));
            else setMessage('Ошибка');
            return;
        }

        const url = (active.url) ? active.url : active.title;
        const objBody = {...primaryKeys, ...changedFiels};
        dispatch(ADD_DATA(url, objBody, foreignKeys, setMessage));
    }

    const clickBack = () => {
        navigate('/sign-in', {state: {fromPage: 'admin'}});
        localStorage.removeItem('isAdmin')
    }

    useEffect(() => {
        dispatch(GET_ROOMS(setModal));
    },[])

    return (
        <div className='admin__wrapper'>
            <div className="admin__header">
                <img src={left} onClick={clickBack} alt="left"/>
                <p className='admin__title'>Admin</p>
            </div>
            <div className="admin__flex">
                <div className="admin__options">
                    <p className='option__title'>Tables:</p>
                    {tables.map((item, index) => (
                        <a 
                            className={`option__item ${active === item ? 'active' : ''}`}
                            onClick={() => clickOption(item)}
                            key={index}
                        >{item.title}</a>
                    ))}
                </div>
                <div className="admin__form">
                    <p className='form__title'>{active.title}</p>
                    {active.primary_key.length > 0 &&
                        <InputsList title='Primary key' list={active.primary_key} setObjAdmin={setPrimaryKeys} />
                    }
                    {active.foreign_key.length > 0 &&
                        <InputsList title='Foreign keys' list={active.foreign_key} setObjAdmin={setForeignKeys}  />
                    }
                    {active.inputs.length > 0 &&
                        <InputsList title='Fields' list={active.inputs} setObjAdmin={setFields} />
                    }
                    {message &&
                        <p className={`admin__message ${message === 'Успешно' ? 'success' : ''}`}>{message}</p>
                    }
                    <ButtonForm handleClick={clickSend}>Send</ButtonForm>
                </div>
            </div>
        </div>
    )
}

export default Admin