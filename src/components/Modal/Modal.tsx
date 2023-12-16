import React, { FC, useEffect, useState } from 'react';
import { IMovie } from 'src/interfaces';
import './Modal.css'

import cross from "src/icons/cross.svg"

interface IModal {
    movie: IMovie,
    isModal: boolean,
    setIsModal: (value: boolean) => void,
    setCustomBack: (str: string) => void
}

const Modal:FC<IModal> = ({movie, isModal, setIsModal, setCustomBack}) => {
    const [trailerVideo, setTrailerVideo] = useState('');
    
    // скрыть скролл и установить ссылку на видео
    useEffect(() => {
        if (isModal) {
            document.body.style.overflowY = 'hidden';
            setTrailerVideo(`https://www.youtube.com/embed/${movie.trailer.split("v=")[1]}`);
        }
    }, [isModal])

    // закрыть окно и остановить видео
    const clickCross = () => {
        setIsModal(false);
        setTrailerVideo('');
        setTimeout(() => {
            document.body.style.overflowY = 'auto';
        },400);
        setCustomBack('/afisha');
    }

    // закрыть окно и остановить видео при клике вне окна
    const clickBackground = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) clickCross();
    };

    return (
        <div className={`modal__background ${isModal ? 'open' : ''}`} onClick={(e) => clickBackground(e)}>
            <div className={`modal ${isModal ? 'open' : ''}`}>
                <div className="modal__content">
                    <div className="modal__header">
                        <span className='modal__title'>{movie.title}</span>
                        <img src={cross} className='modal__cross' onClick={() => clickCross()} alt="cross" />
                    </div>
                    <div className="modal__video">
                        <iframe src={trailerVideo} id="Youtube" allowFullScreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
