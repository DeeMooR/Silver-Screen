import React from 'react'
import './PresentCard.css'
import SlideInfo from 'src/components/SlideInfo'
import { arrGiftCarts, arrPresentCard } from 'src/helpers'
import PageTemplate from 'src/components/PageTemplate'
import { BackgroundPresentCard } from './styled'
import { IGiftCard } from 'src/interfaces'
import GiftCard from 'src/components/GiftCard/GiftCard'
import PresentCardText from './PresentCardText'

const PresentCard = () => {
    window.scrollTo({top: 0});
    return (
        <PageTemplate>
            <div className='presentCard'>
                <div className="presentCard__main">
                    <SlideInfo slide={arrPresentCard} reverse />
                </div>
                <div className="presentCard__wrapper">
                    <p className="presentCard__this">Электронная подарочная карта кинопространств mooon и Silver Screen - это лучшая возможность в пару кликов получить online-подарок, который подарит приятные эмоции другу, коллеге или близкому вам человеку</p>
                    <div className="presentCard__table">
                        <div className="presentCard__cards">
                            {arrGiftCarts.map((item: IGiftCard) => (
                                <div className="presentCard__item" key={item.id}>
                                    <GiftCard obj={item} />
                                </div>
                            ))}
                        </div>
                        <div className="presentCard__basket">
                            <p className='presentCard-basket__empty'>Корзина пуста</p>
                        </div>
                    </div>
                    <PresentCardText />
                </div>
            </div>
        </PageTemplate>
    )
}

export default PresentCard
