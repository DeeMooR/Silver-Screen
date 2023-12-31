import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { ADD_CARD_SELECT } from 'src/actions/actions'
import { ICard, IDataCardSelect } from 'src/interfaces'
import './GiftCard.css'

import plus from "src/icons/plus.png"
import minus from "src/icons/minus.png"

interface IGiftCard {
    obj: ICard,
    arrGiftCards: ICard[]
}

const GiftCard:FC<IGiftCard> = ({obj, arrGiftCards}) => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();

    const arrGiftSelect: IDataCardSelect[] = useSelector(({storeUser}) => storeUser.card_select);
    const [amountSelect, setAmountSelect] = useState(0);    // кол-во выбранных карт
    const [modal, setModal] = useState(<div/>);
  
    useEffect(() => {
        if (!arrGiftSelect.length) setAmountSelect(0);
    }, [arrGiftSelect])

    // удаление из корзину
    const clickMinus = () => {
        if (amountSelect > 0) {
            setAmountSelect(amountSelect - 1);
            dispatch({ type: "REMOVE_CARD_SELECT", payload: obj.id });
        }
    }

    // добавление в корзину
    const clickPlus = () => {
        setAmountSelect(amountSelect + 1);
        const newCardSelect: IDataCardSelect = {
            card_id: obj.id,
            number: obj.amount + 1,
            cost: obj.cost
        };
        dispatch(ADD_CARD_SELECT(obj.id, newCardSelect, setModal));
    }

    return (
        <div className='giftCard'>
            {modal}
            <img src={obj.image} className='giftCard__image' alt="card" />
            <div className="giftCard__info">
                <p className='giftCard__title'>Подарочная карта</p>
                <div className="giftCard__choise">
                    <img src={minus} className='giftCard__minus' alt="minus" onClick={clickMinus} />
                    <p className='giftCard__amount'>{amountSelect}</p>
                    <img src={plus} className='giftCard__plus' alt="plus" onClick={clickPlus} />
                </div>
                <p className='giftCard__cost'>{obj.cost} BYN</p>
            </div>
        </div>
    )
}

export default GiftCard
