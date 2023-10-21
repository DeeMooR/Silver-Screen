import React, { useEffect, useState } from 'react'
import './BuyTicketPage.css'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IMovie } from 'src/interfaces';
import { addDayOfWeek, arrMovies, formateDateItem, getAudio, getTimePlusDuration } from 'src/helpers';
import PageMovieTemplate from 'src/components/PageMovieTemplate';
import ModalAge18 from 'src/components/ModalAge18';

import location from "src/icons/location.png"
import calendar from "src/icons/calendar.png"
import video from "src/icons/video.png"

const BuyTicketPage = () => {
    const dispatch = useDispatch();
    const {id} = useParams<{id: string}>();
    let {date} = useParams<{date: string}>();
    const {room} = useParams<{room: string}>();
    const {time} = useParams<{time: string}>();

    let movie: IMovie | undefined;
    if (id) movie = arrMovies[+id];
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
        {movie && date && room && time &&
            <PageMovieTemplate movie={movie}>
                <div className='buyTicketPage'>
                    <div className="buyTicketPage__header">
                        <img src={movie.image} className='buyTicketPage__image' alt="poster" />
                        <div className="buyTicketPage-header__right">
                            <p className='buyTicketPage-header__title'>{movie.title}</p>
                            <div className='buyTicketPage-header__info'>
                                <div className="flex__icon-text">
                                    <img src={location} alt="location" />
                                    <p className="buyTicketPage-header__address-room">Silver Screen в ТРЦ Arena city г. Минск, пр Победителей, 84 / Зал {room}</p>
                                </div>
                                <div className="flex__icon-text">
                                    <img src={calendar} alt="calendar" />
                                    <p className="buyTicketPage-header__date-time">{formateDateItem(addDayOfWeek(date))} / {time} - {getTimePlusDuration(time, movie.duration)} </p>
                                </div>
                                <div className="flex__icon-text">
                                    <img src={video} alt="video" />
                                    <p className="buyTicketPage-header__date-time">{movie.video} / {getAudio(+room)} </p>
                                </div>
                                <div className="buyTicketPage-header__age">{movie.age}+</div>
                            </div>
                        </div>
                    </div>
                </div>
                {movie.age >= 18 &&
                    <ModalAge18 isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
                }
            </PageMovieTemplate>
        }
        </>
    )
}

export default BuyTicketPage
