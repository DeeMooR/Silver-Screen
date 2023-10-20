import React, { FC, useEffect, useState } from 'react'
import './AccountBuy.css'
import { IDataMyCard } from 'src/interfaces'
import { GET_GIFT_CARDS, GET_MY_CARDS } from 'src/actions/actions';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import AccountBuyCard from './AccountBuyCard/AccountBuyCard';
import { Link } from 'react-router-dom';


const AccountBuy = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const [arrMyCards, setArrMyCards] = useState<IDataMyCard[]>([]);
    const [modal, setModal] = useState(<div/>);

    useEffect(() => {
        window.scrollTo({top: 0});
        dispatch(GET_MY_CARDS(setArrMyCards, setModal));
        dispatch(GET_GIFT_CARDS(setModal));
    },[])

    return (
        <>
        {modal}
        <div className='accountBuy'>
            <div className="accountBuy__title">Подарочные карты</div>
            {arrMyCards.length ? (
                <div className="accountBuy__items">
                    {arrMyCards.map((item) => (
                        <AccountBuyCard obj={item} key={item.numberCard} />
                    ))}
                </div>
            ) : (
                <p className='accountBuy__empty'>Пусто. Приобрести подарочную карту можно <Link to='/presentcard'>здесь</Link>.</p>
            )}
        </div>
        </>
    )
}

export default AccountBuy
