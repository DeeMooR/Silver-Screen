import React, { useEffect, useState } from 'react'
import './PresentCard.css'
import SlideInfo from 'src/components/SlideInfo'
import { getDateIn180, getTodayDate } from 'src/helpers'
import PageTemplate from 'src/components/PageTemplate'
import { BackgroundPresentCard } from './styled'
import { ICard, IDataCardSelect, IDataMyCard, IAddMyCard } from 'src/interfaces'
import GiftCard from 'src/components/GiftCard'
import PresentCardText from './PresentCardText'
import { useDispatch, useSelector } from 'react-redux'
import { GET_GIFT_CARDS, ADD_MY_CARD } from 'src/actions/actions'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import BasketCard from 'src/components/BasketCard'
import Button from 'src/components/Button'
import { Link, useNavigate } from 'react-router-dom'
import ModalPay from 'src/components/ModalPay'
import Basket from 'src/components/Basket'

const PresentCard = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const navigate = useNavigate();
    const userId = useSelector(({store}) => store.user.id);
    const arrGiftCards: ICard[] = useSelector(({store}) => store.card);
    const arrCardSelect: IDataCardSelect[] = useSelector(({store}) => store.cardSelect);
    const mainPresentCard = useSelector(({storePages}) => storePages.mainPresentCard);
    const isLoading = useSelector(({store}) => store.isLoading);
    const isLoadingPage = useSelector(({store}) => store.isLoadingPage);
    const [modal, setModal] = useState(<div/>);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const token = localStorage.getItem('access');

    const clickSignIn = () => {
        navigate('/sign-in', {state: {fromPage: '/presentcard'}});
    }
    const clickPay = () => {
        setModalIsOpen(true);
        arrCardSelect.map((item) => {
            const myCard: IAddMyCard = {
                number_card: item.number,
                start: getTodayDate(),
                end: getDateIn180(),
                status: true
            }
            dispatch(ADD_MY_CARD(userId, item.card_id, myCard, setModal));
        })
    }

    useEffect(() => {
        window.scrollTo({top: 0});
        dispatch({ type: "CLEAR_CARD_SELECT" });

        const fetchData = async () => {
            dispatch({ type: "SET_LOADING_PAGE" });
            if (!arrGiftCards.length) await dispatch(GET_GIFT_CARDS(setModal));
            dispatch({ type: "SET_LOADING_PAGE" });
        };
        if (!arrGiftCards.length) fetchData();
    },[])

    return (
        <PageTemplate>
            {modal}
            <div className='presentCard'>
                <div className="presentCard__main">
                    <SlideInfo slide={mainPresentCard} reverse />
                </div>
                <div className="presentCard__wrapper">
                    <p className="presentCard__this">Электронная подарочная карта кинопространств mooon и Silver Screen - это лучшая возможность в пару кликов получить online-подарок, который подарит приятные эмоции другу, коллеге или близкому вам человеку</p>
                        {isLoadingPage ? (
                            <div className="loaderPage">
                                <div className="loaderPage__element"></div>
                            </div>
                        ) : (
                            <div className={`presentCard__table ${isLoading ? 'loading' : ''}`}>
                                {isLoading &&
                                    <div className="loader">
                                        <div className="loader__element"></div>
                                    </div>
                                }
                                <div className="presentCard__cards">
                                    {arrGiftCards.map((item: ICard) => (
                                        <div className="cards__item" key={item.id}>
                                            <GiftCard obj={item} arrGiftCards={arrGiftCards} />
                                        </div>
                                    ))}
                                </div>
                                <div className={`presentCard__basket ${!arrCardSelect.length ? 'empty' : ''}`}>
                                    {arrCardSelect.length ?
                                        <>
                                        <p className='presentCard-basket__title'>Корзина</p>
                                        <Basket type='card' setModal={setModal} />
                                        {token 
                                        ? <Button color='red' fill handleClick={clickPay}>Подтвердить и перейти к оплате</Button>
                                        : <Button color='red' fill handleClick={clickSignIn}>Войти в аккаунт</Button>
                                        }
                                        <p className='presentCard-basket__text'>Подтверждая приобретение данной карты вы принимаете условия и соглашаетесь с <Link to='/page404'>Публичным договором купли-продажи подарочных карт</Link></p>
                                        </>
                                    : 
                                        <p>Корзина пуста</p>
                                    }
                                </div>
                            </div>
                        )}
                    <PresentCardText />
                </div>
                <ModalPay isOpen={modalIsOpen} setIsOpen={setModalIsOpen} type='card' />
            </div>
        </PageTemplate>
    )
}

export default PresentCard
