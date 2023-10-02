import React, { FC, useEffect, useState } from 'react';
import { IMovie } from 'src/interfaces';
import './Modal.css'

import cross from "src/icons/cross.png"

interface IModal {
    movie: IMovie,
    isModal: boolean,
    setIsModal: (value: boolean) => void
}

const Modal:FC<IModal> = ({movie, isModal, setIsModal}) => {

    if (isModal) {
        document.body.style.overflowY = 'hidden';
        document.body.style.padding = '0 17px 0 0';
    }

    const clickCross = () => {
        setIsModal(false);
        setTimeout(() => {
            document.body.style.overflowY = 'auto';
            document.body.style.padding = '0';
        },400);
    }
    const clickBackground = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) clickCross();
    };

    let trailerVideo;
    if (movie) trailerVideo = `https://www.youtube.com/embed/${movie.trailer.split("v=")[1]}`;

    return (
        <div className={`modal__background ${isModal ? 'open' : ''}`} onClick={(e) => clickBackground(e)}>
            <div className={`modal ${isModal ? 'open' : ''}`}>
                <div className="modal__content">
                    <div className="modal__header">
                        <span className='modal__title'>{movie.title}</span>
                        <img src={cross} className='modal__cross' onClick={() => clickCross()} alt="cross" />
                    </div>
                    <div className="modal__video">
                        <iframe src={trailerVideo} allowFullScreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
