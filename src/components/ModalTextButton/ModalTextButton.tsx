import React, { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button';
import './ModalTextButton.css'

import cross from "src/icons/cross.svg"

interface IModalTextButton {
    isOpen: boolean,
    setIsOpen: (v: boolean) => void,
    setIsOpenOther?: (v: boolean) => void,
    type: 'age18' | 'goSignIn'
}

const ModalTextButton:FC<IModalTextButton> = ({isOpen, setIsOpen, setIsOpenOther, type}) => {
    const navigate = useNavigate();
    
    // скрыть скролл при откртом окне
    if (isOpen) {
        document.body.style.overflowY = 'hidden';
        document.body.style.padding = '0 7px 0 0';
    }

    // вернуть что окно открыто
    useEffect(() => {
        setTimeout(() => {
            setIsOpen(true);
        }, 50);
    }, [])

    // закрыть окно
    const clickClose = () => {
        setIsOpen(false);
        setTimeout(() => {
            if (setIsOpenOther) setIsOpenOther(false);
            document.body.style.overflowY = 'auto';
            document.body.style.padding = '0';
        },400);
    }

    // закрыть окно при клике вне окна
    const clickBackground = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) clickClose();
    };

    // переход на страницу 'Sign-in'
    const clickSignIn = () => {
        const url = window.location.href.split('3000')[1];
        navigate('/sign-in', {state: {fromPage: url}});
    }

    return (
        <div className={`modalTextButton__background ${isOpen? 'open' : ''}`} onClick={(e) => clickBackground(e)}>
            <div className={`modalTextButton ${isOpen ? 'open' : ''}`}>
                <div className="modalTextButton__content">
                    <img src={cross} className='modalTextButton__cross' onClick={clickClose} alt="cross" />
                    {type === 'age18' ? (
                        <>
                        <p className='modalTextButton__title'>Обращаем внимание!</p>
                        <p className='modalTextButton__text'>Показ фильма разрешен зрителям старше 18 лет</p>
                        </>
                    ) : (
                        <>
                        <p className='modalTextButton__title'>Требуется авторизация!</p>
                        <p className='modalTextButton__text'>Для покупки билета в кино необходимо <a onClick={clickSignIn}>войти в аккаунт</a></p>
                        </>
                    )}
                    <Button color='red' fill handleClick={clickClose}>Понятно</Button>
                </div>
            </div>
        </div>
    );
};

export default ModalTextButton;
