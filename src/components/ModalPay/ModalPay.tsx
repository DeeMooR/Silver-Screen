import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './ModalPay.css'

import cross from "src/icons/cross.svg"

interface IModalPay {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    setIsOpenOther?: (value: boolean) => void,
    type: 'card' | 'seat'
}

const ModalPay:FC<IModalPay> = ({isOpen, setIsOpen, setIsOpenOther, type}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // скрыть скролл при откртом окне
    if (isOpen) {
        document.body.style.overflowY = 'hidden';
        document.body.style.padding = '0 7px 0 0';
    }

    // закрыть окно
    const clickCross = () => {
        dispatch({ type: "CLEAR_CARD_SELECT" });
        if(setIsOpenOther) setIsOpenOther(false);
        setIsOpen(false);
        setTimeout(() => {
            document.body.style.overflowY = 'auto';
            document.body.style.padding = '0';
        },400);
    }

    // закрыть окно при клике вне окна
    const clickBackground = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) clickCross();
    };

    // перейти в аккаунт
    const clickAccount = () => {
        dispatch({ type: "CLEAR_CARD_SELECT" });
        document.body.style.overflowY = 'auto';
        document.body.style.padding = '0';
        navigate('/account');
    }

    return (
        <div className={`modalPay__background ${isOpen? 'open' : ''}`} onClick={(e) => clickBackground(e)}>
            <div className={`modalPay ${isOpen ? 'open' : ''}`}>
                <div className="modalPay__content">
                    <img src={cross} className='modalPay__cross' onClick={() => clickCross()} alt="cross" />
                    <p className='modalPay__title'>Оплата прошла успешно</p>
                    <p className='modalPay__text'>Спасибо за покупку!</p>
                    <p className='modalPay__text'>Вся необходимая информация {type === 'card' ? 'о подарочной карте' : 'o билете'} теперь доступна в вашем <a onClick={clickAccount}>личном кабинете</a>.</p>
                    <p className='modalPay__text'>Приятного просмотра!</p>
                </div>
            </div>
        </div>
    );
};

export default ModalPay;
