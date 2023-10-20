import React, { FC, useEffect, useState } from 'react'
import './AccountBuy.css'
import { IDataGiftCard, IDataMyCard } from 'src/interfaces'
import { GET_GIFT_CARDS, GET_MY_CARDS } from 'src/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import AccountBuyCard from './AccountBuyCard/AccountBuyCard';
import { Link } from 'react-router-dom';


const AccountBuy = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const arrGiftCards: IDataGiftCard[] = useSelector(({ giftCards }) => giftCards);
    const arrMyCards: IDataMyCard[] = useSelector(({ myCards }) => myCards);
    const isLoadingPage = useSelector(({isLoadingPage}) => isLoadingPage);
    const [modal, setModal] = useState(<div/>);

    useEffect(() => {
        const fetchData = async () => {
            window.scrollTo({ top: 0 });
            dispatch({ type: "SET_LOADING_PAGE" });
            if (!arrMyCards.length) await dispatch(GET_MY_CARDS(setModal));
            if (!arrGiftCards.length) await dispatch(GET_GIFT_CARDS(setModal));
            dispatch({ type: "SET_LOADING_PAGE" });
        };
        fetchData();
    },[])
    return (
        <>
        {modal}
        <div className='accountBuy'>
            <div className="accountBuy__title">Подарочные карты</div>
            {isLoadingPage ? (
                <div className="loader">
                    <div className="loader__element"></div>
                </div>
            ) : (
                <>
                {arrMyCards.length ? (
                    <div className="accountBuy__items">
                        {arrMyCards.map((item) => (
                            <AccountBuyCard obj={item} key={item.numberCard} />
                        ))}
                    </div>
                ) : (
                    <p className='accountBuy__empty'>Пусто. Приобрести подарочную карту можно <Link to='/presentcard'>здесь</Link>.</p>
                )}
                </>
            )}
        </div>
        </>
    )
}

export default AccountBuy
