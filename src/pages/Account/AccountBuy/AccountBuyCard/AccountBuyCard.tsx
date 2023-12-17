import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { compareDayNowEnd } from 'src/helpers/helper'
import { ICard, IDataMyCard } from 'src/interfaces'
import './AccountBuyCard.css'

interface IAccountBuyCard {
    obj: IDataMyCard
}

const AccountBuyCard:FC<IAccountBuyCard> = ({obj}) => {
    const arrGiftCards: ICard[] = useSelector(({storePages}) => storePages.cards);
    const findObj = arrGiftCards.find((item) => obj.card_id === item.id);

    // срок действия карты истёк?
    if (compareDayNowEnd(obj.end)) obj.status = false;

    return (
        <>
        {findObj &&
            <div className='accountBuyCard'>
                <img src={findObj.image} className='accountBuyCard__image' alt="card" />
                <div className="accountBuyCard__info">
                    <div className="accountBuyCard__cost-number">
                        <p className='accountBuyCard__cost'><span>{findObj.cost}</span> BYN</p>
                        <span className='accountBuyCard__number'>(#{obj.number_card})</span>
                    </div>
                    <div className="accountBuyCard__period-status">
                        <div className="accountBuyCard__period">
                            <span className='accountBuyCard__start'>с: {obj.start}</span>
                            <span className='accountBuyCard__end'>до: {obj.end}</span>
                        </div>
                        <p className={`accountBuyCard__status ${!obj.status ? 'used' : ''}`}>{obj.status ? 'Активна' : 'Не активна'}</p>
                    </div>
                    <p className={`accountBuyCard__status ${!obj.status ? 'used' : ''}`}>{obj.status ? 'Активна' : 'Не активна'}</p>
                </div>
            </div>
        }
        </>
    )
}

export default AccountBuyCard
