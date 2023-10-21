import React, { FC, useEffect, useState } from 'react';
import { IMovie } from 'src/interfaces';
import Button from '../Button';
import './ModalAge18.css'

import cross from "src/icons/cross.svg"

interface IModalAge18 {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void
}

const ModalAge18:FC<IModalAge18> = ({isOpen, setIsOpen}) => {
    if (isOpen) {
        document.body.style.overflowY = 'hidden';
        document.body.style.padding = '0 7px 0 0';
    }
    const clickClose = () => {
        setIsOpen(false);
        setTimeout(() => {
            document.body.style.overflowY = 'auto';
            document.body.style.padding = '0';
        },400);
    }
    const clickBackground = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) clickClose();
    };

    useEffect(() => {
        setIsOpen(true);
    }, [])

    return (
        <div className={`modalAge18__background ${isOpen? 'open' : ''}`} onClick={(e) => clickBackground(e)}>
            <div className={`modalAge18 ${isOpen ? 'open' : ''}`}>
                <div className="modalAge18__content">
                    <img src={cross} className='modalAge18__cross' onClick={() => clickClose()} alt="cross" />
                    <p className='modalAge18__title'>Обращаем внимание!</p>
                    <p className='modalAge18__text'>Показ фильма разрешен зрителям старше 18 лет</p>
                    <Button color='red' fill handleClick={clickClose}>Понятно</Button>
                </div>
            </div>
        </div>
    );
};

export default ModalAge18;
