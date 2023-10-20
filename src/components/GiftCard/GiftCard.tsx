import React, { FC, useState } from 'react'
import { IDataGiftCard, IDataGiftSelect } from 'src/interfaces'
import './GiftCard.css'

import plus from "src/icons/plus.png"
import minus from "src/icons/minus.png"
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch } from 'react-redux'
import { AnyAction } from 'redux'
import { ADD_GIFT_SELECT } from 'src/actions/actions'

interface IGiftCard {
    obj: IDataGiftCard
}

const GiftCard:FC<IGiftCard> = ({obj}) => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const [amountSelect, setAmountSelect] = useState(0);
    const [modal, setModal] = useState(<div/>);

    const clickMinus = () => {
        if (amountSelect > 0) {
            setAmountSelect(amountSelect - 1);
            dispatch({ type: "REMOVE_GIFT_SELECT", payload: obj.id });
        }
    }
    const clickPlus = () => {
        setAmountSelect(amountSelect + 1);
        const objForAPI = {...obj, amount: obj.amount + 1};
        const objForGiftSelect: IDataGiftSelect = {
            idCard: obj.id,
            number: obj.amount + 1,
            cost: obj.cost
        };
        dispatch(ADD_GIFT_SELECT(obj.id, objForAPI, objForGiftSelect, setModal));
    }

    return (
        <div className='giftCard'>
            {modal}
            <img src={obj.image} className='giftCard__image' alt="giftCard" />
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
