import React from 'react'
import { IGiftCard } from 'src/interfaces'
import './GiftCard.css'


import plus from "src/icons/plus.png"
import minus from "src/icons/minus.png"

const GiftCard = ({obj}: {obj: IGiftCard}) => {
    return (
        <div className='giftCard'>
            <img src={obj.image} className='giftCard__image' alt="giftCard" />
            <div className="giftCard__info">
                <p className='giftCard__title'>Подарочная карта</p>
                <div className="giftCard__choise">
                    <img src={minus} className='giftCard__minus' alt="minus" />
                    <p className='giftCard__amount'>0</p>
                    <img src={plus} className='giftCard__plus' alt="plus" />
                </div>
                <p className='giftCard__cost'>{obj.cost} BYN</p>
            </div>
        </div>
    )
}

export default GiftCard
